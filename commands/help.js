module.exports = {
  name: "help",
  execute(message) {
    const list = [...message.client.commands.keys()].sort();

    message.channel.send(
      `📖 **Help Menu**\n\n` +
      `**Total Commands:** ${list.length}\n\n` +
      list.join(", ")
    );
  }
};