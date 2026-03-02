const db = require("../db");

exports.create = async (req, res) => {
  try {
    const { nome_aluno, turma, missao_code, acao_id } = req.body;

    // validações básicas
    if (
      !nome_aluno ||
      !turma ||
      !missao_code ||
      !Array.isArray(acao_id) ||
      acao_id.length === 0
    ) {
      return res.status(400).json({
        error: "Dados incompletos para registrar resposta"
      });
    }

    // regra de pontuação
    const PONTOS_POR_ACAO = 10;
    const pontos = acao_id.length * PONTOS_POR_ACAO;

    // estrutura JSON das ações
    const acoesJson = acao_id.map(id => ({ id }));

    const sql = `
      INSERT INTO respostas
        (nome, turma, missao_code, acao_id, pontos)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      nome,
      turma,
      missao_code,                  // INT (FK lógica)
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
