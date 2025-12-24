const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seedController");

// POST /api/admin/seed-missoes
router.post("/seed-missoes", seedController.seedMissoes);

module.exports = router;