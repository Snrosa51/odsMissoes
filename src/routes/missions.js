// src/routes/missions.js
const express = require('express');
const router = express.Router();
const missionsController = require('../controllers/missionsController');

// GET /api/missoes
router.get('/', missionsController.listarMissoes);

module.exports = router;

