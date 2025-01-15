// const { TwitterApi} = require('twitter-api-v2')
const axios = require('axios');

class TwitterFetcher {

    #bearerToken;
    #clientId;
    #clientSecret;
    #accessToken;
    #refreshToken;
    #db;
    #BASE_URL = 'https://api.twitter.com/2';

    constructor(bearerToken, clientId, clientSecret, accessToken, refreshToken, db) {
      this.#bearerToken = bearerToken;
      this.#clientId = clientId;
      this.#clientSecret = clientSecret;
      this.#accessToken = accessToken;
      this.#refreshToken = refreshToken;
      this.#db = db;

      // this.client = new TwitterApi(bearerToken);
    }

    async getBearerToken() {
        return this.#bearerToken;
    }

    async regenerateAccessToken() {
      try {

        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', this.#refreshToken);

        const basicAuth = Buffer.from(`${this.#clientId}:${this.#clientSecret}`).toString('base64');

        const response = await axios.post(`${this.#BASE_URL}/oauth2/token`, params.toString(), {
            headers:{
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("response from access token to regenerate", response.data);

        this.#accessToken = response.data.access_token;
        this.#refreshToken = response.data.refresh_token;

        await this.#db.query("UPDATE user_tokens SET access_token = $1, refresh_token = $2 WHERE user_id = $3", [this.#accessToken, this.#refreshToken, this.#bearerToken]);

        return {
          accessToken: this.#accessToken,
          refreshToken: this.#refreshToken
        };

      } catch (error) {
        console.error("Error regenerating access token", error);
      }
      
    }


    async fetchTweetIds(userId, sinceId = null) {
        console.log("fetching tweets with userId", userId, "sinceId", sinceId);
        const params = new URLSearchParams();

        if(sinceId) params.append('since_id', sinceId);
        params.append('max_results', '100');
        params.append('exclude', 'retweets,replies');

        let paginationToken = null;
        let tweetIds = [];

        do{
          
          try {
            const response = await axios.get(`${this.#BASE_URL}/users/${userId}/tweets`, {
              headers: {
                'Authorization': `Bearer ${this.#bearerToken}`
              },
              params: {
                ...Object.fromEntries(params.entries()),
                pagination_token: paginationToken
              }
            })

            
            if(response.data.data) {
              tweetIds.push(...response.data?.data?.map((tweet) => tweet.id));
              // console.log("response from tweets", response.data.data.map((tweet) => tweet.id) , "meta", response.data.meta);
            }else if(response.data.meta?.result_count === 0) {
              break;
            }

            paginationToken = response.data.meta?.next_token;
          
          } catch (error) {

            console.error("Error fetching tweets", error);
            break;
          }
          
        } while(paginationToken)

        return tweetIds;
    }

    /*
    * @param {string} tweetId - tweet id
    * @returns {Promise<string>} - liked tweet users
    */
    async fetchLikedTweetUsers(tweetId) {

      try {

        const params = new URLSearchParams();
        params.append('max_results', '100');

        let likedTweetUsers = [];

        let paginationToken = null;
        do{

          const response = await axios.get(`${this.#BASE_URL}/tweets/${tweetId}/liking_users`, {
            headers: {
              'Authorization': `Bearer ${this.#accessToken}`
            },
            params: {
              ...Object.fromEntries(params.entries()),
              pagination_token: paginationToken
            }
          });
        
        if(response.data.data) {
          likedTweetUsers.push(...response.data.data.map((user) => user.username+`:${tweetId}`));
        }

        paginationToken = response.data.meta?.next_token;
      
        } while(paginationToken)

        return likedTweetUsers;

      } catch (error) {
        console.error("Error fetching liked tweet users", error);
        if(error.response.status === 401) {
          return "Unauthorized";
        }
        if(error.response.status === 429) {
          return "Rate limit exceeded";
        }
        return "Error fetching liked tweet users";
      }
      
    }

    /*
    * @param {Array} tweetIds - Array of tweet ids
    * @returns {Promise<Array>} - Array of liked tweet users
    */
    async fetchLikedTweetUsersBatch(tweetIds) {
      const likedTweetUsers = [];

      for(const tweetId of tweetIds) {
        let likedUsers = await this.fetchLikedTweetUsers(tweetId);
        console.log("likedUsers", likedUsers);
        if(likedUsers === "Unauthorized") {
          await this.regenerateAccessToken();
          likedUsers = await this.fetchLikedTweetUsers(tweetId);
        }
        if(likedUsers === "Rate limit exceeded") {
          likedTweetUsers.push("Rate limit exceeded");
          break;
        }
        likedTweetUsers.push(...likedUsers);
      }

      return likedTweetUsers;
    }
  
 
    // async fetchTweetIds(userId, sinceId = null) {
    //   let options = { max_results: 100 };
    //   if (sinceId) options.since_id = sinceId;
  
    //   let tweetIds = [];
    //   let paginationToken = null;
  
    //   do {

    //     if(paginationToken) options.pagination_token = paginationToken;

    //     const response = await this.client.v2.tweets(userId, {
    //       ...options,
    //     });
        
    //     console.log("response from tweets", response.data.map((tweet) => tweet.id));
    //     if (response.data) {
    //       tweetIds.push(...response.data.map((tweet) => tweet.id));
    //     }
  
    //     paginationToken = response.meta?.next_token;
    //   } while (paginationToken);
  
    //   return tweetIds;
    // }
  }

module.exports = TwitterFetcher;