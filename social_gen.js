const fs = require('fs');
const path = require('path');

const actions = [
    'slap', 'pat', 'poke', 'kiss', 'cuddle', 'bite', 'punch', 'kick', 'tickle', 'highfive',
    'wave', 'wink', 'dance', 'smile', 'cry', 'laugh', 'shrug', 'pout', 'stare', 'blush',
    'sleep', 'eat', 'drink', 'run', 'hide', 'kill', 'greet', 'cheer', 'clap', 'flex',
    'facepalm', 'sigh', 'scream', 'scold', 'beg', 'boring', 'confused', 'evillaugh', 'handshake', 'lick',
    'nom', 'nosebleed', 'nyan', 'panicked', 'pout', 'punch', 'run', 'sad', 'shrug', 'think'
];

const socialDir = path.join(__dirname, 'commands', 'social');
if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true });

actions.forEach(action => {
    const content = `const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '${action}',
    async execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) return message.reply("Mention someone to ${action}!");
        
        const embed = new EmbedBuilder()
            .setDescription(\`**\${message.author.username}** decided to **${action}** **\${target.username}**!\`)
            .setColor('#' + Math.floor(Math.random()*16777215).toString(16)); // Random color

        message.channel.send({ embeds: [embed] });
    }
};`;

    fs.writeFileSync(path.join(socialDir, `${action}.js`), content);
});

console.log(`✅ Generated ${actions.length} unique social commands!`);
