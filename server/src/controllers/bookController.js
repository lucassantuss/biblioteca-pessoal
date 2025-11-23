const db = require("../models/db");

module.exports = {
  list(req, res) {
    db.all(`SELECT * FROM books WHERE userId = ?`, [req.userId], (err, rows) => {
      res.json(rows);
    });
  },

  add(req, res) {
    const { title, author } = req.body;
    const image = req.file ? req.file.filename : null;

    db.run(
      `INSERT INTO books (title, author, image, userId) VALUES (?, ?, ?, ?)`,
      [title, author, image, req.userId],
      function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: this.lastID });
      }
    );
  }
};
