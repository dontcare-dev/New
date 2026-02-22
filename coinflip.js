const db = require('../../db.js');

module.exports = {
    name: 'coinflip',
    async execute(message, args) {
        const bet = parseInt(args[0]);
        if (isNaN(bet) || bet < 1) return message.reply("Enter a valid bet amount!");

        const user = db.prepare('SELECT wallet FROM users WHERE id = ?').get(message.author.id);
        if (!user || user.wallet < bet) return message.reply("You don't have enough money!");

        const win = Math.random() > 0.5;
        const change = win ? bet : -bet;

        db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(change, message.author.id);
        
        message.reply(win ? `🪙 It's **Heads**! You won **$${bet}**!` : `🪙 It's **Tails**! You lost **$${bet}**.`);
    }
};
