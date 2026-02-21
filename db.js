const Database = require('better-sqlite3');
const db = new Database('economy.db');

// Create the table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY, 
        wallet INTEGER DEFAULT 0, 
        bank INTEGER DEFAULT 0,
        work_exp INTEGER DEFAULT 0
    )
`).run();

module.exports = db;
