const { PermissionsBitField } = require("discord.js");

const economy = new Map();
const cooldowns = {
  daily: new Map(),
  work: new Map(),
  gamble: new Map()
};

const CD = {
  daily: 86400000,
  work: 300000,
  gamble: 60000
};

const now = () => Date.now();
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const num = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

module.exports = (client) => {

  const commands = {};

  /* ================= MODERATION ================= */

  commands.ban = async (m) => {
    if (!m.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return m.reply("❌ You lack permission.");
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone.");
    await u.ban();
    m.reply(`🔨 ${u.user.tag} has been banned.`);
  };

  commands.kick = async (m) => {
    if (!m.member.permissions.has(PermissionsBitField.Flags.KickMembers))
      return m.reply("❌ You lack permission.");
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone.");
    await u.kick();
    m.reply(`👢 ${u.user.tag} was kicked.`);
  };

  commands.softban = async (m) => {
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone.");
    await u.ban({ days: 1 });
    await m.guild.members.unban(u.id);
    m.reply(`🧹 ${u.user.tag} softbanned (messages cleared).`);
  };

  commands.timeout = async (m) => {
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone.");
    await u.timeout(10 * 60 * 1000);
    m.reply(`⏳ ${u.user.tag} timed out for 10 minutes.`);
  };

  /* ================= FUN ================= */

  commands.roast = (m) =>
    m.reply(rand([
      "NPC behavior detected.",
      "Even your WiFi left you.",
      "Skill issue.",
      "Built like a loading screen."
    ]));

  commands.hug = (m) =>
    m.reply(`🤗 ${m.author.username} hugs ${m.mentions.users.first()?.username || "everyone"}!`);

  commands.slap = (m) =>
    m.reply(`💥 ${m.author.username} slaps ${m.mentions.users.first()?.username || "air"}!`);

  commands.roll = (m) => m.reply(`🎲 You rolled **${num(1, 6)}**`);

  commands.flip = (m) => m.reply(`🪙 ${Math.random() > 0.5 ? "Heads" : "Tails"}`);

  commands["8ball"] = (m) =>
    m.reply(rand(["Yes", "No", "Definitely", "Ask again later", "Absolutely not"]));

  commands.say = (m) => {
    const text = m.content.split(" ").slice(2).join(" ");
    if (!text) return m.reply("Say what?");
    m.channel.send(text);
  };

  commands.shrug = (m) => m.reply("¯\\_(ツ)_/¯");
  commands.clap = (m) => m.reply("👏👏👏");
  commands.smile = (m) => m.reply("😊");
  commands.fact = (m) =>
    m.reply(rand([
      "Octopuses have three hearts.",
      "Honey never spoils.",
      "Bananas are berries."
    ]));

  /* ================= UTILITY ================= */

  commands.avatar = (m) =>
    m.reply((m.mentions.users.first() || m.author).displayAvatarURL({ size: 512 }));

  commands.userinfo = (m) => {
    const u = m.mentions.users.first() || m.author;
    m.reply(`👤 ${u.tag}\n🆔 ${u.id}`);
  };

  commands.serverinfo = (m) =>
    m.reply(`🏠 ${m.guild.name}\n👥 ${m.guild.memberCount} members`);

  commands.pingdb = (m) =>
    m.reply(`📡 Latency: ${Date.now() - m.createdTimestamp}ms`);

  /* ================= ECONOMY ================= */

  const getBal = (id) => economy.get(id) || 0;
  const setBal = (id, v) => economy.set(id, v);

  commands.balance = (m) =>
    m.reply(`💰 Balance: ${getBal(m.author.id)} coins`);

  commands.daily = (m) => {
    const last = cooldowns.daily.get(m.author.id) || 0;
    if (now() - last < CD.daily)
      return m.reply("⏳ Daily already claimed.");
    cooldowns.daily.set(m.author.id, now());
    setBal(m.author.id, getBal(m.author.id) + 100);
    m.reply("💸 You received **100 coins**.");
  };

  commands.work = (m) => {
    const last = cooldowns.work.get(m.author.id) || 0;
    if (now() - last < CD.work)
      return m.reply("⏳ You’re tired. Try later.");
    cooldowns.work.set(m.author.id, now());
    const earn = num(15, 60);
    setBal(m.author.id, getBal(m.author.id) + earn);
    m.reply(`🛠 You earned **${earn} coins**.`);
  };

  commands.gamble = (m, args) => {
    const amt = parseInt(args[0]);
    if (!amt || amt <= 0) return m.reply("Invalid amount.");
    let bal = getBal(m.author.id);
    if (bal < amt) return m.reply("Not enough coins.");
    if (Math.random() > 0.5) {
      setBal(m.author.id, bal + amt);
      m.reply(`🎉 You won **${amt} coins**!`);
    } else {
      setBal(m.author.id, bal - amt);
      m.reply(`💀 You lost **${amt} coins**.`);
    }
  };

  /* ================= REGISTER ================= */

  for (const [name, execute] of Object.entries(commands)) {
    client.commands.set(name, { name, execute });
  }
};