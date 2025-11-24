const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login(req, res) {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
      if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

      const correct = bcrypt.compareSync(password, user.password);

      if (!correct) return res.status(400).json({ error: "Senha inválida" });

      const token = jwt.sign({ id: user.id }, "segredo123", { expiresIn: "1h" });
      res.json({ token });
    });
  },

  register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
      if (user) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      const hash = bcrypt.hashSync(password, 10);

      db.run(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, hash],
        function (err) {
          if (err) return res.status(500).json({ error: "Erro ao registrar usuário" });

          return res.status(201).json({ message: "Usuário criado com sucesso", id: this.lastID });
        }
      );
    });
  },

  delete(req, res) {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
      if (err) return res.status(500).json({ error: "Erro ao excluir usuário" });

      if (this.changes === 0) return res.status(404).json({ error: "Usuário não encontrado" });

      return res.json({ message: "Usuário excluído com sucesso" });
    });
  }
};
