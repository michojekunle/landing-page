require('dotenv').config();

const TwitterFetcher  = require('./classes/TwitterFetcher.js');
const CacheManager  = require('./classes/CacheManager.js');
const Scheduler  = require('./classes/Scheduler.js');
const Discord = require('./classes/Discord.js');
const Database = require('./classes/Database.js');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const discordToken = process.env.DISCORD_TOKEN;
const databaseUrl = process.env.DATABASE_URL;

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;


async function initializeServer() {
    
    const db = new Database(databaseUrl);
    await db.connect();

    const { accessToken, refreshToken } = await getAccessAndRefreshTokens(db, bearerToken);

    const discord = new Discord(discordToken, db);
    const fetcher = new TwitterFetcher(bearerToken , clientId, clientSecret, accessToken, refreshToken, db);
    const cacheManager = new CacheManager();
    const scheduler = new Scheduler(fetcher, cacheManager , db);

    scheduler.scheduleTask('1708116225535221760');
    // cacheManager.getLikedTweetUsers().then((likedTweetUsers) => {
    //     console.log("likedTweetUsers", likedTweetUsers);
    // });
}


async function getAccessAndRefreshTokens(db, bearerToken) {
    const data = await db.query("SELECT access_token, refresh_token FROM user_tokens WHERE user_id = $1", [bearerToken]);
    const { access_token : accessToken, refresh_token : refreshToken } = data[0];
    return { accessToken, refreshToken };
}


initializeServer();

// fetcher.regenerateAccessToken().then((data) => {
//     console.log("data", data);
// });

// cacheManager.getAllTweetIds().then((tweetIds) => {
//     console.log("tweetIds", tweetIds , "length", tweetIds.length);
// });