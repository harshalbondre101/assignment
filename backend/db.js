const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'vibe.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('SQLite open error', err.message);
});

// Initialize tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL,
      FOREIGN KEY(productId) REFERENCES products(id)
    )
  `);
});

module.exports = db;
