const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/", auth, bookController.list);
router.post("/", auth, upload.single("image"), bookController.add);

module.exports = router;
