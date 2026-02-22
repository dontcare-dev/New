const Database = require('better-sqlite3');
const db = new Database('bot_data.db');

// Setup tables for Economy and Warnings
db.prepare(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, wallet INTEGER DEFAULT 0, bank INTEGER DEFAULT 0)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS warns (user_id TEXT, guild_id TEXT, reason TEXT)`).run();

module.exports = db;
