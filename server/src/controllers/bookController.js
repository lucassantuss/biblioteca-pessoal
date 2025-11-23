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
  },

  updateBook(req, res) {
    const { id } = req.params;
    const { title, author } = req.body;
    const newImage = req.file ? req.file.filename : null;

    db.get(
      `SELECT * FROM books WHERE id = ? AND userId = ?`,
      [id, req.userId],
      (err, book) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!book) return res.status(404).json({ error: "Livro não encontrado" });

        const finalImage = newImage ? newImage : book.image;

        db.run(
          `UPDATE books SET title = ?, author = ?, image = ? WHERE id = ?`,
          [title, author, finalImage, id],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });

            if (newImage && book.image) {
              const oldPath = path.join(__dirname, "../../uploads", book.image);
              if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            res.json({ message: "Livro atualizado com sucesso" });
          }
        );
      }
    );
  },

  deleteBook(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM books WHERE id = ?`, [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Livro excluído com sucesso" });
    });
  }
};
