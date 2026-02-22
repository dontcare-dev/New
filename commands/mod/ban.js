module.exports = {
    name: 'ban',
    async execute(message, args) {
        if (!message.member.permissions.has('BanMembers')) return message.reply("❌ You lack permission to ban.");
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!user) return message.reply("Who are we banning?");
        if (!user.bannable) return message.reply("I cannot ban this user.");

        await user.ban({ reason });
        message.reply(`🚫 **${user.user.tag}** was banned. Reason: ${reason}`);
    }
};
