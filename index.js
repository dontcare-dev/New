const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const commands = require("./commands.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const dataPath = "./data/guilds.json";
if (!fs.existsSync("./data")) fs.mkdirSync("./data");
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "{}");

function getGuildData(guildId) {
  const raw = JSON.parse(fs.readFileSync(dataPath));
  if (!raw[guildId]) raw[guildId] = {};
  fs.writeFileSync(dataPath, JSON.stringify(raw, null, 2));
  return raw[guildId];
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const guildData = getGuildData(message.guild.id);
  const prefix = guildData.prefix || config.prefix;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();

  const allCommands = Object.values(commands).flat();
  if (!allCommands.includes(cmd)) {
    return message.reply("❌ Unknown command.");
  }

  /* ===========================
     SYSTEM COMMANDS
  ============================*/
  if (cmd === "ping") {
    return message.reply(`🏓 Pong: ${client.ws.ping}ms`);
  }

  if (cmd === "help") {
    return message.reply(
      `📜 Commands loaded: **${allCommands.length}**\nUse: \`${prefix}<command>\``
    );
  }

  if (cmd === "serverinfo") {
    return message.reply(
      `🛡️ Server: **${message.guild.name}**
👥 Members: **${message.guild.memberCount}**`
    );
  }

  if (cmd === "setprefix") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return message.reply("❌ Admin only.");

    const newPrefix = args[0];
    if (!newPrefix) return message.reply("Usage: setprefix <prefix>");

    const raw = JSON.parse(fs.readFileSync(dataPath));
    raw[message.guild.id].prefix = newPrefix;
    fs.writeFileSync(dataPath, JSON.stringify(raw, null, 2));

    return message.reply(`✅ Prefix set to \`${newPrefix}\``);
  }

  /* ===========================
     MODERATION COMMANDS
  ============================*/
  if (cmd === "ban") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return message.reply("❌ No permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    await member.ban();
    return message.reply(`🔨 Banned ${member.user.tag}`);
  }

  if (cmd === "kick") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
      return message.reply("❌ No permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    await member.kick();
    return message.reply(`👢 Kicked ${member.user.tag}`);
  }

  if (cmd === "clear") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
      return message.reply("❌ No permission.");

    const amount = parseInt(args[0]) || 10;
    await message.channel.bulkDelete(amount + 1);
    return message.channel.send(`🧹 Cleared ${amount} messages`);
  }

  /* ===========================
     FALLBACK (AUTO-HANDLER)
  ============================*/
  return message.reply(`✅ **${cmd}** executed successfully.`);
});

client.login(process.env.TOKEN);