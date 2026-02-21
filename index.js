const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Load core commands
client.commands.set("ping", require("./commands/ping"));
client.commands.set("help", require("./commands/help"));

// Load 150 named commands
require("./commands/namedCommands")(client);

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply("❌ Error executing command");
  }
});

// ✅ RAILWAY TOKEN FIX
const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN missing in Railway Variables");
  process.exit(1);
}

client.login(TOKEN);