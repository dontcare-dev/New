const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./bot.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 0,
  money INTEGER DEFAULT 0
)`);

module.exports = db;