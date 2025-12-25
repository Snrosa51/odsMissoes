const express = require("express");
const router = express.Router();
const seedController = require("../controllers/seedController");

router.post("/seed-missoes", seedController.seedMissoes);

module.exports = router;
