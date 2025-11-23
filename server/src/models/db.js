const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    image TEXT,
    userId INTEGER
  )`);

  db.run(
    `INSERT INTO users (email, password) VALUES ('admin@teste.com', '$2a$10$9Q/W4Dbb1I1rRZsDbaCgXu5pO4ZUhQ8ClI5sYBSEJ3At8u.mMk9WS')`
);
});

module.exports = db;

// Senha padrão do admin = 123456