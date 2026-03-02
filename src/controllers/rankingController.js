// src/controllers/rankingController.js
const db = require('../db');

exports.getRanking = async (req, res) => {
  try {
    const sql = `
      SELECT
  r.turma,
  r.nome_aluno,
  SUM(a.pontos) AS total_pontos,
  COUNT(*) AS total_acoes
FROM respostas r
JOIN acoes a ON a.id = r.acao_id
GROUP BY r.turma, r.nome_aluno
ORDER BY total_pontos DESC, total_acoes DESC;
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

