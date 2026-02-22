const db = require('../../db.js');

module.exports = {
    name: 'roulette',
    async execute(message, args) {
        const color = args[0]?.toLowerCase(); // red, black, or green
        const bet = parseInt(args[1]);

        if (!['red', 'black', 'green'].includes(color) || isNaN(bet)) {
            return message.reply("Usage: `,roulette [red/black/green] [amount]`");
        }

        const result = Math.floor(Math.random() * 37);
        const winColor = result === 0 ? 'green' : (result % 2 === 0 ? 'black' : 'red');
        
        let payout = -bet;
        if (color === winColor) {
            payout = (color === 'green') ? bet * 35 : bet;
        }

        db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(payout, message.author.id);
        message.reply(`🎡 The ball landed on **${result} (${winColor})**. ${payout > 0 ? `You won **$${payout}**!` : `You lost **$${bet}**.`}`);
    }
};
