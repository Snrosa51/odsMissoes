// src/controllers/missionsController.js

const db = require("../db");

exports.getMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nome, acoes_json FROM missions ORDER BY id"
    );

    const missoes = rows.map(row => ({
      id: row.id,
      nome: row.nome,
      acoes: JSON.parse(row.acoes_json)
    }));

    res.json(missoes);

  } catch (error) {
    console.error("Erro ao carregar missões:", error);
    res.status(500).json({ erro: "Erro ao carregar missões" });
  }
};
