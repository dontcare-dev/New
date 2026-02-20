const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./src/config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();
client.config = config;

require("./src/handlers/commandHandler")(client);
require("./src/handlers/eventHandler")(client);

client.login(config.token);