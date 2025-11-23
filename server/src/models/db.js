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

  // Senha padrão do admin = 123456
  db.run(
    `INSERT INTO users (email, password) VALUES ('admin@teste.com', '$2a$10$Iv166JB5LgijGetJ4ihCJuCVVkwlU2YjPX7JXoEKo9JJXmWf1urQ.')`
  );
});

module.exports = db;