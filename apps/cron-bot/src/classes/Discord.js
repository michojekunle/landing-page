
const { Client, GatewayIntentBits } = require('discord.js');


class Discord {

    #discordToken
    #client;
    #db;

    constructor(discordToken , db) {
        this.#discordToken = discordToken;
        this.#db = db;

        try {
            this.#client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages , GatewayIntentBits.MessageContent] });
            this.#initHandlers();
        } catch (error) {
            console.error("Error initializing Discord client", error);
        }
    }

    async #initHandlers() {

        this.#client.on('ready', () => {
            console.log('Discord Bot is ready');
        });

        this.#client.on('messageCreate', async (message) => await this.#handleMessageCreate(message));

        this.#client.login(this.#discordToken);
    }

    async #handleMessageCreate(message) {
        
        if(message.author.bot) return; //ignore bot messages
        // console.log("message", message);
        try {
            const content = message.content.toLowerCase();

            if(content === 'sm') {
                const result = await this.#db.query('UPDATE users SET points = points + 1 WHERE "discordId" = $1 RETURNING points', [message.author.username]);
                console.log("increased sm count for user", message?.author?.username);
            }

        } catch (error) {
            console.error("Error handling Discord SM message", error);
        }
    }


}

module.exports = Discord;
