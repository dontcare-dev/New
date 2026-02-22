const db = require('../../db.js');

module.exports = {
    name: 'dice',
    async execute(message, args) {
        const bet = parseInt(args[0]);
        if (!bet) return message.reply("Usage: `,dice [amount]`");

        const userRoll = Math.floor(Math.random() * 6) + 1;
        const botRoll = Math.floor(Math.random() * 6) + 1;

        if (userRoll > botRoll) {
            db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(bet, message.author.id);
            message.reply(`🎲 You rolled **${userRoll}**, I rolled **${botRoll}**. You win **$${bet}**!`);
        } else {
            db.prepare('UPDATE users SET wallet = wallet - ? WHERE id = ?').run(bet, message.author.id);
            message.reply(`🎲 You rolled **${userRoll}**, I rolled **${botRoll}**. You lost **$${bet}**.`);
        }
    }
};
