const fs = require('fs');
const path = require('path');

const adminCmds = [
    'slowmode', 'lock', 'unlock', 'nuke', 'setnick', 'addrole', 'removerole', 
    'mute', 'unmute', 'deafen', 'undeafen', 'vmute', 'vunmute', 'vkick', 
    'softban', 'tempban', 'unban', 'warns', 'clearwarns', 'lockdown', 
    'role-create', 'role-delete', 'channel-create', 'channel-delete',
    'audit-log', 'setprefix', 'setmodlog', 'auto-mod-on', 'auto-mod-off', 'slowmode-off'
];

const modDir = path.join(__dirname, 'commands', 'mod');
if (!fs.existsSync(modDir)) fs.mkdirSync(modDir, { recursive: true });

adminCmds.forEach(cmd => {
    const content = `module.exports = {
    name: '${cmd}',
    async execute(message, args) {
        if (!message.member.permissions.has('Administrator')) return message.reply("Admin only.");
        message.reply("The **${cmd}** logic is ready. Customize this file in \`commands/mod/${cmd}.js\`.");
    }
};`;
    fs.writeFileSync(path.join(modDir, `${cmd}.js`), content);
});

console.log(`✅ Generated ${adminCmds.length} Admin/Mod commands!`);
