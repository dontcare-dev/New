const db = require('../../db.js');
module.exports = {
    name: 'work',
    async execute(message) {
        const gain = Math.floor(Math.random() * 500) + 100;
        db.prepare('INSERT OR IGNORE INTO users (id) VALUES (?)').run(message.author.id);
        db.prepare('UPDATE users SET wallet = wallet + ? WHERE id = ?').run(gain, message.author.id);
        message.reply(`You worked as a developer and earned **$${gain}**!`);
    }
};
