const db = require('../../db.js');

module.exports = {
    name: 'slots',
    async execute(message, args) {
        const bet = parseInt(args[0]);
        if (isNaN(bet) || bet < 1) return message.reply("Bet some money first!");

        const user = db.prepare('SELECT wallet FROM users WHERE id = ?').get(message.author.id);
        if (!user || user.wallet < bet) return message.reply("Insufficient funds!");

        const emojis = ["🍎", "🍐", "🍋", "💎", "🎰"];
        const a = emojis[Math.floor(Math.random() * emojis.length)];
        const b = emojis[Math.floor(Math.random() * emojis.length)];
        const c = emojis[Math.floor(Math.random() * emojis.length)];

        let multiplier = 0;
        if (a === b && b === c) multiplier = 10; // Jackpot
        else if (a === b || b === c || a === c) multiplier = 2; // Pair

        const profit = (bet * multiplier) - bet;
        db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(profit, message.author.id);

        message.channel.send(`[ ${a} | ${b} | ${c} ]\n${multiplier > 0 ? `Winner! You got **$${bet * multiplier}**` : "You lost it all."}`);
    }
};
