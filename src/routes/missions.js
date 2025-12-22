// src/routes/missions.js

const express = require("express");
const router = express.Router();

const missionsController = require("../controllers/missionsController");

router.get("/", missionsController.getMissoes);

module.exports = router;
