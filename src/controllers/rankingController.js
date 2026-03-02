// src/controllers/rankingController.js
const db = require('../db');

exports.getRanking = async (req, res) => {
  try {
    const sql = `
      SELECT
        nome,
        turma,
        SUM(pontos) AS pontos
      FROM respostas
      GROUP BY nome, turma
      ORDER BY pontos DESC
      LIMIT 12
    `;

    const [rows] = await db.query(sql);

    const ranking = rows.map((row, index) => ({
      posicao: index + 1,
      nome: row.nome,
      turma: row.turma,
      pontos: Number(row.pontos)
    }));

    res.json(ranking);

  } catch (error) {
    console.error("ERRO AO BUSCAR RANKING:", error);
    res.status(500).json({
      error: "Erro ao buscar ranking"
    });
  }
};

