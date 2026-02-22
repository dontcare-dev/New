const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'help',
    async execute(message, args) {
        const { commands } = message.client;
        if (!args.length) {
            const categories = [...new Set(commands.map(c => c.category))];
            const embed = new EmbedBuilder()
                .setTitle("Main Help Menu")
                .setDescription(`Current Command Count: **${commands.size}**\nUse \`,help [category]\` to see logic names.`)
                .addFields({ name: 'Categories', value: categories.join('\n') });
            return message.channel.send({ embeds: [embed] });
        }
        
        const cat = args[0].toLowerCase();
        const list = commands.filter(c => c.category === cat);
        if (!list.size) return message.reply("Category not found.");
        
        message.channel.send(`**${cat.toUpperCase()} COMMANDS:**\n${list.map(c => `\`${c.name}\``).join(', ')}`);
    }
};
