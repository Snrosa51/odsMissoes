const db = require("../db")

exports.create = (req, res) => {
  const { nome, serie, missaoTitulo, acoes_json } = req.body;

  if (!nome || !serie || !missaoTitulo || !acoes_json || !acoes_json.length) {
    return res.status(400).json({
      error: 'Dados incompletos para registrar resposta'
    });
  }

  const pontos = acoes_json.length * 10;

  const sql = `
    INSERT INTO respostas
    (nome, serie, missao_titulo, acoes_json, pontos)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome,
      serie,
      missaoTitulo,
      JSON.stringify(acoes_json),
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
