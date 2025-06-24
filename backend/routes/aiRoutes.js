// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // configure as needed

// Accepts multipart/form-data: summary, command (text), files (lab/image)
router.post("/ai/process-case", auth, upload.array("files"), aiController.processCase);

module.exports = router;
