const { PermissionsBitField } = require("discord.js");

const economy = new Map();
const cooldowns = new Map();

const cd = (id, time) => {
  const last = cooldowns.get(id) || 0;
  if (Date.now() - last < time) return true;
  cooldowns.set(id, Date.now());
  return false;
};

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = (client) => {
  const cmds = {};

  /* ===== MODERATION ===== */
  cmds.ban = async (m) => {
    if (!m.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return m.reply("❌ No permission");
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone");
    await u.ban();
    m.reply(`🔨 ${u.user.tag} banned`);
  };

  cmds.kick = async (m) => {
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone");
    await u.kick();
    m.reply(`👢 ${u.user.tag} kicked`);
  };

  cmds.timeout = async (m) => {
    const u = m.mentions.members.first();
    if (!u) return m.reply("Mention someone");
    await u.timeout(5 * 60 * 1000);
    m.reply(`⏳ ${u.user.tag} timed out`);
  };

  /* ===== FUN ===== */
  cmds.roast = (m) =>
    m.reply(pick([
      "NPC behavior detected",
      "Skill issue",
      "Even your shadow left",
      "Built like lag"
    ]));

  cmds.hug = (m) =>
    m.reply(`🤗 ${m.author.username} hugs ${m.mentions.users.first()?.username || "everyone"}`);

  cmds.slap = (m) =>
    m.reply(`💥 ${m.author.username} slapped ${m.mentions.users.first()?.username || "air"}`);

  cmds.roll = (m) => m.reply(`🎲 Rolled **${rand(1,6)}**`);
  cmds.flip = (m) => m.reply(`🪙 ${Math.random() > 0.5 ? "Heads" : "Tails"}`);
  cmds.shrug = (m) => m.reply("¯\\_(ツ)_/¯");
  cmds.clap = () => "👏👏👏";

  /* ===== UTILITY ===== */
  cmds.avatar = (m) =>
    m.reply((m.mentions.users.first() || m.author).displayAvatarURL({ size: 512 }));

  cmds.userinfo = (m) => {
    const u = m.mentions.users.first() || m.author;
    m.reply(`👤 ${u.tag}\n🆔 ${u.id}`);
  };

  cmds.serverinfo = (m) =>
    m.reply(`🏠 ${m.guild.name}\n👥 ${m.guild.memberCount}`);

  /* ===== ECONOMY ===== */
  const bal = (id) => economy.get(id) || 0;
  const set = (id, v) => economy.set(id, v);

  cmds.balance = (m) => m.reply(`💰 ${bal(m.author.id)} coins`);

  cmds.daily = (m) => {
    if (cd(m.author.id + "daily", 86400000))
      return m.reply("⏳ Already claimed");
    set(m.author.id, bal(m.author.id) + 100);
    m.reply("💸 +100 coins");
  };

  cmds.work = (m) => {
    if (cd(m.author.id + "work", 300000))
      return m.reply("⏳ Cooldown");
    const earn = rand(10, 50);
    set(m.author.id, bal(m.author.id) + earn);
    m.reply(`🛠 Earned ${earn}`);
  };

  cmds.gamble = (m, args) => {
    const amt = parseInt(args[0]);
    if (!amt) return m.reply("Enter amount");
    if (bal(m.author.id) < amt) return m.reply("Not enough coins");
    if (Math.random() > 0.5) {
      set(m.author.id, bal(m.author.id) + amt);
      m.reply(`🎉 Won ${amt}`);
    } else {
      set(m.author.id, bal(m.author.id) - amt);
      m.reply(`💀 Lost ${amt}`);
    }
  };

  /* REGISTER */
  for (const [name, fn] of Object.entries(cmds)) {
    client.commands.set(name, { name, execute: fn });
  }
};