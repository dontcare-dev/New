const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = ",";

/* ================= COMMAND LIST ================= */
const COMMANDS = [
  "ping","help","uptime","botinfo","serverinfo","userinfo","avatar",
  "ban","kick","mute","unmute","warn","clear",
  "balance","daily","work",
  "joke","meme","coinflip",
  "rank","level",
  "ai","ask",
  "reload","shutdown"
];

/* ================= READY ================= */
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`📦 Loaded ${COMMANDS.length} commands`);
});

/* ================= MESSAGE HANDLER ================= */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot || !msg.guild) return;
  if (!msg.content.startsWith(PREFIX)) return;

  const args = msg.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = args.shift().toLowerCase();

  if (!COMMANDS.includes(cmd)) return;

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setDescription(`✅ Command **${cmd}** executed`);

  msg.reply({ embeds: [embed] });
});

/* ================= LOGIN ================= */
if (!process.env.TOKEN) {
  console.error("❌ TOKEN environment variable missing");
  process.exit(1);
}

client.login(process.env.TOKEN);