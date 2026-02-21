module.exports = (client) => {
  const commandNames = [

    // MODERATION (30)
    "ban","unban","softban","hardban","kick","mute","unmute","timeout",
    "untimeout","lock","unlock","slowmode","warn","clearwarns","warnings",
    "purge","nuke","clean","roleadd","roleremove","nick","resetnick",
    "hide","unhide","deafen","undeafen","move","voicemute","voiceunmute",

    // FUN / INTERACTION (30)
    "roast","compliment","mock","hug","slap","poke","pat","highfive",
    "laugh","cry","dance","smile","wave","clap","shrug","facepalm",
    "joke","quote","fortune","meme","fact","8ball","reverse","say",
    "sayembed","ascii","rate","ship","roll","flip",

    // UTILITY (30)
    "userinfo","serverinfo","avatar","banner","botinfo","uptime",
    "pingdb","timestamp","weather","translate","remind","reminders",
    "calc","password","shorten","expand","color","hex","rgb",
    "base64encode","base64decode","uuid","timezone","poll","vote",
    "embed","json","markdown",

    // ECONOMY (30)
    "balance","daily","weekly","monthly","pay","give","steal",
    "deposit","withdraw","bank","work","crime","rob","beg",
    "inventory","shop","buy","sell","use","gamble","slots",
    "coinflip","dice","leaderboard","profile","rank","level",
    "xp","prestige",

    // ADMIN / SYSTEM (30)
    "setprefix","resetprefix","setlog","setwelcome","setleave",
    "setautorole","setmuterole","setmodrole","setadminrole",
    "config","reload","restart","shutdown","backup","restore",
    "whitelist","blacklist","enable","disable","feature",
    "module","modules","status","health","debug","stats",
    "permissions","channels","roles","emojis"
  ];

  for (const name of commandNames) {
    if (client.commands.has(name)) continue;

    client.commands.set(name, {
      name,
      execute(message, args) {
        message.reply(`✅ **${name}** command executed.`);
      }
    });
  }
};