// src/routes/missions.js

const express = require("express");
const router = express.Router();

const missionsController = require("../controllers/missionsController");

router.get("/", async (req, res) => {
  try {
    await missionsController.getMissoes(req, res);
  } catch (err) {
    console.error("Erro na rota /api/missoes:", err);
    res.status(500).json({ erro: "Falha ao carregar missões" });
  }
});

module.exports = router;

