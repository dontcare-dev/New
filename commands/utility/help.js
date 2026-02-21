const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'List all commands or info about a category.',
    async execute(message, args) {
        const { commands } = message.client;

        // General Help: List Categories
        if (!args.length) {
            const categories = [...new Set(commands.map(cmd => cmd.category))];
            
            const embed = new EmbedBuilder()
                .setTitle('Bot Help Menu')
                .setDescription(`I have **${commands.size}** commands! \nUse \`${prefix}help [category]\` to see commands.`)
                .addFields({ name: 'Categories', value: categories.map(c => `\`${c}\``).join(', ') })
                .setColor('#00ff99');

            return message.channel.send({ embeds: [embed] });
        }

        // Category Help: List specific commands
        const categoryInput = args[0].toLowerCase();
        const catCmds = commands.filter(cmd => cmd.category.toLowerCase() === categoryInput);

        if (!catCmds.size) return message.reply('Category not found!');

        const catEmbed = new EmbedBuilder()
            .setTitle(`${categoryInput.toUpperCase()} Commands`)
            .setDescription(catCmds.map(c => `\`${c.name}\``).join(', '))
            .setColor('#3498db');

        message.channel.send({ embeds: [catEmbed] });
    },
};
