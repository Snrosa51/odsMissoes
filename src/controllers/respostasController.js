const db = require("../db");

exports.create = async (req, res) => {
  try {
    const { nome, serie, missaoId, acoes } = req.body;

    // validações básicas
    if (
      !nome ||
      !serie ||
      !missaoId ||
      !Array.isArray(acoes) ||
      acoes.length === 0
    ) {
      return res.status(400).json({
        error: "Dados incompletos para registrar resposta"
      });
    }

    // regra de pontuação
    const PONTOS_POR_ACAO = 10;
    const pontos = acoes.length * PONTOS_POR_ACAO;

    // estrutura JSON das ações
    const acoesJson = acoes.map(id => ({ id }));

    const sql = `
      INSERT INTO respostas
        (nome, serie, missao_id, acoes_json, pontos)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      nome,
      serie,
      missaoId,                  // INT (FK lógica)
      JSON.stringify(acoesJson), // JSON válido
      pontos
    ]);

    res.json({
      success: true,
      pontos
    });

  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    res.status(500).json({
      error: "Erro ao salvar resposta."
    });
  }
};
