// src/controllers/respostasController.js
const db = require("../db");

exports.create = (req, res) => {
  const { nome, serie, missaoId, acoes } = req.body;

  // validações básicas
  if (!nome || !serie || !missaoId || !Array.isArray(acoes) || acoes.length === 0) {
    return res.status(400).json({
      error: "Dados incompletos para registrar resposta"
    });
  }

  // regra de pontuação
  const PONTOS_POR_ACAO = 10;
  const pontos = acoes.length * PONTOS_POR_ACAO;

  // transforma ações em JSON estruturado
  const acoesJson = acoes.map(id => ({ id }));

  const sql = `
    INSERT INTO respostas
      (nome, serie, missao_id, acoes_json, pontos)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome,
      serie,
      missaoId,                     // INT (FK lógica)
      JSON.stringify(acoesJson),    // JSON válido
      pontos
    ],
    (err) => {
      if (err) {
        console.error("Erro ao salvar resposta:", err);
        return res.status(500).json({
          error: "Erro ao salvar resposta."
        });
      }

      // resposta esperada pelo frontend
      res.json({
        success: true,
        pontos
      });
    }
  );
};

