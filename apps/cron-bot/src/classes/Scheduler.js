const cron = require('node-cron')

class Scheduler {
    #userId;
    #db;

    constructor(fetcher, cacheManager, db) {
        this.fetcher = fetcher;
        this.cacheManager = cacheManager;
        this.#db = db;
    }

    async processTweets(userId) {
        const sinceId = await this.cacheManager.getLastFetchedTweetId() || null;
        
        const tweetIds = await this.fetcher.fetchTweetIds(userId, sinceId);

        if (tweetIds.length > 0) {
        const newTweets = await this.cacheManager.filterNewTweets(tweetIds);

            if (newTweets.length > 0) {
                await this.cacheManager.setLastFetchedTweetId(newTweets[newTweets.length - 1]); // Update the latest tweet ID
                console.log('Processed new tweets:', newTweets);
            } else {
                console.log('No new tweets to process.');
            }
            
        } else {
        console.log('No tweets fetched.');
        }
    }

    async processLikedTweetUsers() {
        console.log("processing liked tweet users");


        const tweetIds = await this.cacheManager.getAllTweetIds();
        
        //make batches of 30
        const batches = [];
        for(let i = 0; i < tweetIds.length; i += 30) {
            batches.push(tweetIds.slice(i, i + 30));
        }

        let likedTweetUsers = [];

        for(const batch of batches) {
            const likedUsers = await this.fetcher.fetchLikedTweetUsersBatch(batch);
            console.log("likedUsers", likedUsers);
            if(likedUsers[likedUsers.length - 1] === "Rate limit exceeded") {
                likedTweetUsers.push(...likedUsers.slice(0, likedUsers.length - 1));
                await this.#db.insertLikedTweetUsers(likedTweetUsers);
                break;
            }
            likedTweetUsers.push(...likedUsers);
            await this.#db.insertLikedTweetUsers(likedTweetUsers);
        }

        likedTweetUsers = await this.cacheManager.filterNewLikedTweetUsers(likedTweetUsers);

       
    }

    scheduleTask(userId) {
        this.#userId = userId;
        cron.schedule('*/1 * * * *', async () => {
        console.log('Running scheduled task...');
        await this.processTweets(this.#userId);
        });

        cron.schedule('*/1 * * * *', async () => {
            console.log('Running scheduled task...');
            await this.processLikedTweetUsers();
        });
    }
  }

module.exports = Scheduler;