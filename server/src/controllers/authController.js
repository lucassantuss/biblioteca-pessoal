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
  }
};
