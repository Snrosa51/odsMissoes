// src/controllers/seedController.js
const db = require("../db");

/**
 * FUNÇÃO INTERNA (reutilizável)
 * Pode ser usada no boot OU via HTTP
 */
async function executarSeed() {
  const missoes = [
    {
      codigo: "ODS3",
      nome: "Saúde e Bem-estar",
      acoes: [
        { id: "D1", nome: "Lavar as mãos regularmente" },
        { id: "D2", nome: "Manter unhas limpas e cortadas" },
        { id: "D3", nome: "Praticar atividade física" },
        { id: "D4", nome: "Se alimentar na hora certa" },
        { id: "D5", nome: "Comer frutas, legumes e verduras" }
      ]
    },
    {
      codigo: "ODS4",
      nome: "Educação de Qualidade",
      acoes: [
        { id: "E1", nome: "Ler um pouco todos os dias" },
        { id: "E2", nome: "Ajudar um colega nos estudos" },
        { id: "E3", nome: "Organizar o material escolar" },
        { id: "E4", nome: "Fazer o dever de casa" },
        { id: "E5", nome: "Chegar no horário" }
      ]
    }
  ];

  await db.query("DELETE FROM missions");

  for (const m of missoes) {
    await db.query(
      `INSERT INTO missions (codigo, nome, acoes_json)
       VALUES (?, ?, ?)`,
      [m.codigo, m.nome, JSON.stringify(m.acoes)]
    );
  }

  return { total: missoes.length };
}

/**
 * CONTROLLER HTTP (rota protegida)
 */
async function seedMissoes(req, res) {
  try {
    const token = req.headers["x-seed-token"];

    if (token !== process.env.SEED_TOKEN) {
      return res.status(403).json({ error: "Token inválido" });
    }

    const result = await executarSeed();

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    console.error("Erro no seed:", err);
    res.status(500).json({ error: "Erro ao executar seed" });
  }
}

module.exports = {
  executarSeed,
  seedMissoes
};


