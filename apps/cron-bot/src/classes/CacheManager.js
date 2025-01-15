const  Redis = require('ioredis')

class CacheManager {
    constructor() {
        this.redis = new Redis();
        this.lastFetchedTweetId = null;

        this.initialize();
    }

    async initialize() {
        const lastTweetId = await this.redis.get('last_fetched_tweet_id');
        if (lastTweetId) {
            this.lastFetchedTweetId = lastTweetId;
        }
    }

    async isTweetNew(tweetId) {
        const exists = await this.redis.sismember('processed_tweets', tweetId);
        if (!exists) {
            await this.redis.sadd('processed_tweets', tweetId);
            return true;
        }
        return false;
    }

    async filterNewTweets(tweetIds) {
        const results = await Promise.all(tweetIds.map((id) => this.isTweetNew(id)));
        return tweetIds.filter((_, index) => results[index]);
    }

    async getLastFetchedTweetId() {
        return this.lastFetchedTweetId || await this.redis.get('last_fetched_tweet_id');
    }

    async setLastFetchedTweetId(tweetId) {
        await this.redis.set('last_fetched_tweet_id', tweetId);
        this.lastFetchedTweetId = tweetId; // Update the class property
    }

    async getAllTweetIds() {
        const tweetIds = await this.redis.smembers('processed_tweets');
        return tweetIds;
    }
    

    async isLikedTweetUserNew(likedTweetUser) {
        const exists = await this.redis.sismember('processed_liked_tweet_users', likedTweetUser);
        if (!exists) {
            await this.redis.sadd('processed_liked_tweet_users', likedTweetUser);
            return true;
        }
        return false;
    }

    async filterNewLikedTweetUsers(likedTweetUsers) {
        const results = await Promise.all(likedTweetUsers.map((likedUser) => this.isLikedTweetUserNew(likedUser)));
        return likedTweetUsers.filter((_, index) => results[index]);
    }

    async getLikedTweetUsers() {
        const likedTweetUsers = await this.redis.get(`processed_liked_tweet_users`);
        return likedTweetUsers;
    }
}

module.exports = CacheManager;
