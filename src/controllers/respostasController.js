const db = require('../db');

/**
 * POST /api/respostas
 */
exports.create = (req, res) => {
  const { nome, serie, missao_titulo, acoes } = req.body;

  if (!nome || !serie || !missao_titulo || !acoes || !acoes.length) {
    return res.status(400).json({
      error: 'Dados incompletos para registrar resposta'
    });
  }

  const pontos = acoes.length * 10;

  const sql = `
    INSERT INTO respostas
    (nome, serie, missao_titulo, acoes, pontos)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome,
      serie,
      missao_titulo,
      JSON.stringify(acoes),
      pontos
    ],
    (err) => {
      if (err) {
        console.error('Erro ao salvar resposta:', err);
        return res.status(500).json({
          error: 'Erro ao salvar resposta.'
        });
      }

      res.json({
        success: true,
        pontos
      });
    }
  );
};
