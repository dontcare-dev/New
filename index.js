const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, prefix } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        
        // ANTI-DUPLICATE CHECK: Crashes if you use the same name twice
        if (client.commands.has(command.name)) {
            console.error(`🚨 DUPLICATE NAME: "${command.name}" found in ${folder}/${file}`);
            process.exit();
        }

        command.category = folder; 
        client.commands.set(command.name, command);
    }
}

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) {
        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error executing that command.");
        }
    }
});

client.login(token);
console.log("System Ready. Loading 900+ Commands...");
