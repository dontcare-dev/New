module.exports = {
  name: "ping",
  description: "Check bot latency",
  async execute(client, message) {
    message.reply(`🏓 Pong: ${client.ws.ping}ms`);
  }
};