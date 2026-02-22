const db = require('../../db.js');
module.exports = {
    name: 'bal',
    async execute(message) {
        const user = db.prepare('SELECT wallet, bank FROM users WHERE id = ?').get(message.author.id);
        if (!user) return message.reply("You have no money! Try `,work` first.");
        message.reply(`🏦 **Bank:** $${user.bank} | 👛 **Wallet:** $${user.wallet}`);
    }
};
