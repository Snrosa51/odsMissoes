// src/controllers/missionsController.js
const db = require("../db");

exports.listarMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, codigo, nome
      FROM missoes
      ORDER BY id
    `);

    const missoes = rows.map(row => {
      let acoes = [];

      try {
        // garante JSON válido sempre
        if (row.nome) {
          acoes = typeof row.nome === "string"
            ? JSON.parse(row.nome)
            : row.nome;
        }
      } catch (jsonErr) {
        console.error("JSON inválido em missions.acoes_json:", jsonErr);
        acoes = [];
      }

      return {
        id: row.id,
        codigo: row.codigo,
        acoes: row.nome
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

