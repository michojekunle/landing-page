const pkg = require('pg');
const { Pool } = pkg;

class Database {
    #pool;

    constructor(databaseUrl) {
        this.#pool = new Pool({
             connectionString: databaseUrl,
             ssl: {
                rejectUnauthorized: false
             }
        });
    }

    /*
    * Split the liked tweet users into an array of arrays, where each array contains the username and tweetId
    * @param {Map} likedTweetUsers - The map of liked tweet users to split
    */
    #splitAndGroupLikedTweetUsers(likedTweetUsers) {
        const groupedLikedTweetUsers = new Map();

        for(const likedUser of likedTweetUsers) {
            
            const username = likedUser.toString().split(':')[0];
            const tweetId = likedUser.toString().split(':')[1];

            if(groupedLikedTweetUsers.has(username)) {
                groupedLikedTweetUsers.get(username).push(tweetId);
            } else {
                groupedLikedTweetUsers.set(username, [tweetId]);
            }
        }

        return groupedLikedTweetUsers.entries();
    }

    /*
    * Insert liked tweet users into the database
    * @param {Array} likedTweetUsers - The array of liked tweet users to insert
    */
    async insertLikedTweetUsers(likedTweetUsers) {

        try {
            const splitAndGroupLikedTweetUsers = this.#splitAndGroupLikedTweetUsers(likedTweetUsers);

            for(const likedUsers of splitAndGroupLikedTweetUsers) {
                const username = likedUsers[0];
                const tweetIds = likedUsers[1];

                await this.insertLikedTweetUser(username, tweetIds);
            }

        } catch(error) {
            console.error("Error inserting batch of  liked tweet users", error);
        }
    }

    /*
    * Insert a liked tweet user into the database
    * @param {string} username - The username of the liked tweet user
    * @param {Array} tweetIds - The array of tweet ids liked by the user
    */
    async insertLikedTweetUser(username, tweetIds) {
        try {

            await this.query(
            `INSERT INTO twitter_points (username, tweet_ids, points) VALUES ($1, $2, $3)
            ON CONFLICT (username) 
            DO UPDATE 
            SET 
                tweet_ids = array_cat(twitter_points.tweet_ids, EXCLUDED.tweet_ids),
                points = twitter_points.points + EXCLUDED.points,
                updated_at = CURRENT_TIMESTAMP
            `,
            [username, tweetIds, tweetIds.length]);
        
        } catch(error) {
            console.error("Error inserting single liked tweet user", error);
        }
    }
    
    async connect() {
        await this.#pool.connect();
        console.log("Database connected");
    }

    async query(sql, params) {
        try {
            const result = await this.#pool.query(sql, params);
            return result.rows;
        } catch (error) {
            console.error("Error querying database", error);
        }
    }

    async close() {
        await this.#pool.end();
    }
}

module.exports = Database;
