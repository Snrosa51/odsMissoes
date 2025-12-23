// src/controllers/rankingController.js
const db = require('../db');

exports.getRanking = (req, res) => {
  const sql = `
    SELECT
      nome,
      serie,
      SUM(pontos) AS pontos
    FROM respostas
    GROUP BY nome, serie
    ORDER BY pontos DESC
    LIMIT 12
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('ERRO SQL RANKING:', err);
      return res.status(500).json({
        error: 'Erro ao buscar ranking'
      });
    }

    const resultado = rows.map((r, index) => ({
      posicao: index + 1,
      nome: r.nome,
      serie: r.serie,
      pontos: Number(r.pontos)
    }));

    res.json(resultado);
  });
};

