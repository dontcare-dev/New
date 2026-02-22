const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'hug',
    async execute(message, args) {
        const target = message.mentions.users.first();
        if (!target) return message.reply("Who are you trying to hug? Mention someone!");
        if (target.id === message.author.id) return message.reply("You can't hug yourself... but here's a virtual squeeze anyway! 🤗");

        const embed = new EmbedBuilder()
            .setDescription(`**${message.author.username}** gives **${target.username}** a big warm hug! 🤗`)
            .setColor('#FF69B4')
            .setImage('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJpZzRreHpxZzRreHpxZzRreHpxZzRreHpxZzRreHpxJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/u9BxQbM5bxAH6/giphy.gif');

        message.channel.send({ embeds: [embed] });
    }
};
