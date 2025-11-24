const db = require("../models/db");
const fs = require("fs");
const path = require("path");

module.exports = {
  list(req, res) {
    db.all(
      `SELECT * FROM books WHERE userId = ?`,
      [req.userId],
      (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar livros" });
        res.json(rows);
      }
    );
  },

  add(req, res) {
    const { title, author } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || title.trim() === "")
      return res.status(400).json({ error: "O título é obrigatório." });

    if (!author || author.trim() === "")
      return res.status(400).json({ error: "O autor é obrigatório." });

    if (!image)
      return res.status(400).json({ error: "A imagem é obrigatória." });

    db.run(
      `INSERT INTO books (title, author, image, userId) VALUES (?, ?, ?, ?)`,
      [title.trim(), author.trim(), image, req.userId],
      function (err) {
        if (err) return res.status(500).json({ error: "Erro ao salvar livro." });

        res.json({ id: this.lastID });
      }
    );
  },

  updateBook(req, res) {
    const { id } = req.params;
    const { title, author } = req.body;
    const newImage = req.file ? req.file.filename : null;

    if (!title || title.trim() === "")
      return res.status(400).json({ error: "O título é obrigatório." });

    if (!author || author.trim() === "")
      return res.status(400).json({ error: "O autor é obrigatório." });

    db.get(
      `SELECT * FROM books WHERE id = ? AND userId = ?`,
      [id, req.userId],
      (err, book) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar livro." });
        if (!book) return res.status(404).json({ error: "Livro não encontrado." });

        const finalImage = newImage || book.image;

        db.run(
          `UPDATE books SET title = ?, author = ?, image = ? WHERE id = ?`,
          [title.trim(), author.trim(), finalImage, id],
          function (err) {
            if (err) return res.status(500).json({ error: "Erro ao atualizar livro." });

            // Remove a imagem antiga se nova foi enviada
            if (newImage && book.image) {
              const oldPath = path.join(__dirname, "../../uploads", book.image);

              if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
              }
            }

            res.json({ message: "Livro atualizado com sucesso." });
          }
        );
      }
    );
  },

  deleteBook(req, res) {
    const { id } = req.params;

    db.get(
      `SELECT image FROM books WHERE id = ? AND userId = ?`,
      [id, req.userId],
      (err, book) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar livro." });
        if (!book) return res.status(404).json({ error: "Livro não encontrado." });

        db.run(
          `DELETE FROM books WHERE id = ?`,
          [id],
          function (err) {
            if (err) return res.status(500).json({ error: "Erro ao excluir livro." });

            // Remove imagem associada
            if (book.image) {
              const filePath = path.join(__dirname, "../../uploads", book.image);
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }

            res.json({ message: "Livro excluído com sucesso." });
          }
        );
      }
    );
  },
};
