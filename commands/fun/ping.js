module.exports = {
    name: 'ping',
    description: 'Check bot speed',
    async execute(message, args) {
        message.channel.send('🏓 Pong!');
    },
};
