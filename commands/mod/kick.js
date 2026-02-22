module.exports = {
    name: 'kick',
    async execute(message, args) {
        if (!message.member.permissions.has('KickMembers')) return message.reply("❌ You lack permission to kick.");
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!user) return message.reply("Who are we kicking?");
        if (!user.kickable) return message.reply("I can't kick this user (Higher role/Permissions).");

        await user.kick(reason);
        message.reply(`✅ **${user.user.tag}** was kicked. Reason: ${reason}`);
    }
};
