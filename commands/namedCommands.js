module.exports = (client) => {
  const commandNames = [

    // MODERATION
    "ban","unban","softban","hardban","kick","mute","unmute","timeout",
    "untimeout","lock","unlock","slowmode","warn","clearwarns","warnings",
    "purge","nuke","clean","roleadd","roleremove","nick","resetnick",
    "hide","unhide","deafen","undeafen","move","voicemute","voiceunmute",

    // FUN
    "roast","compliment","mock","hug","slap","poke","pat","highfive",
    "laugh","cry","dance","smile","wave","clap","shrug","facepalm",
    "joke","quote","fortune","meme","fact","8ball","reverse","say",
    "sayembed","ascii","rate","ship","roll","flip",

    // UTILITY
    "userinfo","serverinfo","avatar","banner","botinfo","uptime",
    "timestamp","calc","color","hex","rgb","uuid","poll","vote",
    "embed","json","markdown","timezone","shorten","expand","password",

    // ECONOMY
    "balance","daily","weekly","monthly","pay","give","deposit",
    "withdraw","bank","work","crime","rob","beg","inventory","shop",
    "buy","sell","use","gamble","slots","coinflip","dice",
    "leaderboard","profile","rank","level","xp","prestige",

    // ADMIN / SYSTEM
    "setprefix","resetprefix","setlog","setwelcome","setleave",
    "setautorole","setmuterole","setmodrole","setadminrole",
    "config","reload","restart","shutdown","backup","restore",
    "whitelist","blacklist","enable","disable","status","health",
    "debug","stats","permissions","channels","roles","emojis"
  ];

  for (const name of commandNames) {
    if (client.commands.has(name)) continue;

    client.commands.set(name, {
      name,
      execute(message) {
        message.reply(`✅ **${name}** command executed.`);
      }
    });
  }
};