const db = require('../../db.js');

module.exports = {
    name: 'warn',
    async execute(message, args) {
        if (!message.member.permissions.has('ManageMessages')) return message.reply("Permission denied.");
        const target = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!target) return message.reply("Mention a user to warn.");

        db.prepare('INSERT INTO warns (user_id, guild_id, reason) VALUES (?, ?, ?)').run(target.id, message.guild.id, reason);
        message.reply(`⚠️ **${target.tag}** has been warned. Reason: ${reason}`);
    }
};
