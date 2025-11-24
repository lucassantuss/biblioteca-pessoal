const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.post("/register", authController.register);
router.delete("/:id", auth, authController.delete);

module.exports = router;
