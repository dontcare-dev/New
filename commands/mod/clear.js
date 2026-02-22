module.exports = {
    name: 'clear',
    async execute(message, args) {
        if (!message.member.permissions.has('ManageMessages')) return;
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) return message.reply("Enter a number between 1 and 100.");

        await message.channel.bulkDelete(amount + 1, true);
        message.channel.send(`🧹 Deleted **${amount}** messages.`).then(m => setTimeout(() => m.delete(), 3000));
    }
};
