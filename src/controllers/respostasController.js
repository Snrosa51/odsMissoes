const db = require("../db")

exports.create = (req, res) => {
  const { nome, serie, missaoTitulo, acoes } = req.body;

  if (!nome || !serie || !missaoTitulo || !acoes || !acoes.length) {
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
      missaoTitulo,
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

      // 🔥 retorno esperado pelo frontend
      res.json({
        success: true,
        pontos
      });
    }
  );
};
