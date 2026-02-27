// src/controllers/missionsController.js
const db = require("../db");

exports.listarMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, codigo, nome, acoes_json
      FROM missoes
      ORDER BY id
    `);

    const missoes = rows.map(row => {
      let acoes = [];

      try {
        // garante JSON válido sempre
        if (row.acoes_json) {
          acoes = typeof row.acoes_json === "string"
            ? JSON.parse(row.acoes_json)
            : row.acoes_json;
        }
      } catch (jsonErr) {
        console.error("JSON inválido em missions.acoes_json:", jsonErr);
        acoes = [];
      }

      return {
        id: row.id,
        codigo: row.codigo,
        nome: row.nome,
        acoes
      };
    });

    return res.json(missoes);

  } catch (err) {
    console.error("Erro geral ao listar missões:", err);
    return res.status(500).json({
      error: "Erro ao carregar missões"
    });
  }
};

