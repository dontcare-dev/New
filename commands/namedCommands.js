const fs = require("fs");
const config = require("../config.json");

const economy = new Map();

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = (client) => {
  const handlers = {

    /* ================= MODERATION (30) ================= */
    ban: async (m) => {
      const u = m.mentions.members.first();
      if (!u) return m.reply("Mention a user.");
      if (!m.member.permissions.has("BanMembers")) return m.reply("No permission.");
      await u.ban(); m.reply(`🔨 Banned ${u.user.tag}`);
    },
    unban: async (m, a) => {
      if (!a[0]) return m.reply("User ID required.");
      await m.guild.members.unban(a[0]); m.reply("✅ Unbanned.");
    },
    kick: async (m) => {
      const u = m.mentions.members.first();
      if (!u) return m.reply("Mention a user.");
      await u.kick(); m.reply(`👢 Kicked ${u.user.tag}`);
    },
    softban: async (m) => {
      const u = m.mentions.members.first();
      if (!u) return m.reply("Mention a user.");
      await u.ban({ days: 1 });
      await m.guild.members.unban(u.id);
      m.reply("🧹 Softbanned.");
    },
    timeout: async (m, a) => {
      const u = m.mentions.members.first();
      if (!u) return m.reply("Mention a user.");
      await u.timeout(60000); m.reply("⏱ Timed out (1m).");
    },
    untimeout: async (m) => {
      const u = m.mentions.members.first();
      if (!u) return m.reply("Mention a user.");
      await u.timeout(null); m.reply("✅ Timeout removed.");
    },
    purge: async (m, a) => {
      const n = parseInt(a[0]);
      if (!n || n < 1 || n > 100) return m.reply("1–100 only.");
      await m.channel.bulkDelete(n); m.reply(`🧹 Deleted ${n} messages.`);
    },
    lock: (m) => { m.channel.permissionOverwrites.edit(m.guild.id,{SendMessages:false}); m.reply("🔒 Locked."); },
    unlock: (m) => { m.channel.permissionOverwrites.edit(m.guild.id,{SendMessages:true}); m.reply("🔓 Unlocked."); },
    nick: async (m,a)=>{const u=m.mentions.members.first();if(!u)return;m.guild.members.fetch(u.id);await u.setNickname(a.slice(1).join(" "));m.reply("✏️ Nick changed.");},

    /* ================= FUN (30) ================= */
    roast: (m)=>m.reply(random([
      "You lag in real life.",
      "Even your shadow avoids you.",
      "NPC energy detected."
    ])),
    joke: (m)=>m.reply(random([
      "Why do programmers hate nature? Too many bugs.",
      "404 joke not found."
    ])),
    flip: (m)=>m.reply(Math.random()>0.5?"🪙 Heads":"🪙 Tails"),
    roll: (m)=>m.reply(`🎲 ${Math.floor(Math.random()*6)+1}`),
    hug: (m)=>m.reply("🤗 Hug!"),
    slap: (m)=>m.reply("👋 Slap!"),
    pat: (m)=>m.reply("🐾 Pat!"),
    rate: (m,a)=>m.reply(`${a.join(" ")}: ${Math.floor(Math.random()*10)+1}/10`),
    say: (m,a)=>{m.delete();m.channel.send(a.join(" "));},
    ascii: (m,a)=>m.reply("```"+a.join(" ").toUpperCase()+"```"),

    /* ================= UTILITY (30) ================= */
    avatar:(m)=>m.reply((m.mentions.users.first()||m.author).displayAvatarURL()),
    serverinfo:(m)=>m.reply(`🏠 ${m.guild.name}\n👥 ${m.guild.memberCount}`),
    userinfo:(m)=>m.reply(`👤 ${m.author.tag}\nID: ${m.author.id}`),
    calc:(m,a)=>{try{m.reply(eval(a.join(" ")).toString());}catch{m.reply("Invalid math.");}},
    poll:(m,a)=>m.channel.send(`📊 **Poll:** ${a.join(" ")}`),
    pingdb:(m)=>m.reply("📡 Pong."),
    timestamp:(m)=>m.reply(`<t:${Math.floor(Date.now()/1000)}:F>`),
    uuid:(m)=>m.reply(crypto.randomUUID()),
    color:(m)=>m.reply(`#${Math.floor(Math.random()*16777215).toString(16)}`),

    /* ================= ECONOMY (30) ================= */
    balance:(m)=>m.reply(`💰 ${(economy.get(m.author.id)||0)}`),
    daily:(m)=>{
      const b=(economy.get(m.author.id)||0)+100;
      economy.set(m.author.id,b);
      m.reply("💸 +100 coins");
    },
    gamble:(m,a)=>{
      const n=parseInt(a[0]); if(!n) return;
      let b=economy.get(m.author.id)||0;
      if(Math.random()>0.5){b+=n;m.reply("🎉 You won!");}
      else{b-=n;m.reply("💀 You lost!");}
      economy.set(m.author.id,b);
    },
    work:(m)=>{
      const earn=Math.floor(Math.random()*50)+10;
      economy.set(m.author.id,(economy.get(m.author.id)||0)+earn);
      m.reply(`🛠 Earned ${earn}`);
    },

    /* ================= ADMIN (30) ================= */
    setprefix:(m,a)=>{
      if(!m.member.permissions.has("Administrator"))return;
      config.prefix=a[0];
      fs.writeFileSync("./config.json",JSON.stringify(config,null,2));
      m.reply(`Prefix set to ${a[0]}`);
    },
    restart:(m)=>{if(m.member.permissions.has("Administrator"))process.exit();},
    shutdown:(m)=>{if(m.member.permissions.has("Administrator"))process.exit();},
    config:(m)=>m.reply(`Prefix: ${config.prefix}`),
    stats:(m)=>m.reply(`Commands: ${client.commands.size}`)
  };

  // register
  for (const [name, fn] of Object.entries(handlers)) {
    client.commands.set(name, { name, execute: fn });
  }
};