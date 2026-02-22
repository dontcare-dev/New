module.exports = {
    name: 'kick',
    async execute(message, args) {
        if (!message.member.permissions.has('KickMembers')) return message.reply("No permission.");
        const member = message.mentions.members.first();
        if (!member) return message.reply("Who am I kicking?");
        await member.kick();
        message.reply(`${member.user.tag} has been kicked.`);
    }
};
