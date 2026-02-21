const db = require('../../db.js');

module.exports = {
    name: 'work',
    description: 'Work a job to earn money',
    category: 'economy',
    async execute(message, args) {
        const userId = message.author.id;
        
        // Ensure user exists in DB
        let user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            db.prepare('INSERT INTO users (id, wallet) VALUES (?, ?)').run(userId, 0);
            user = { wallet: 0, bank: 0 };
        }

        const earnings = Math.floor(Math.random() * 500) + 100;
        db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(earnings, userId);

        message.reply(`You worked hard and earned **$${earnings}**!`);
    }
};
