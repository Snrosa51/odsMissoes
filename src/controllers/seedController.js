// src/controllers/seedController.js
const db = require("../db");

async function executarSeed() {
  const missoes = [
    {
      codigo: "ODS3",
      nome: "Saúde e Bem-estar",
      acoes: [
        { id: "D1", nome: "Lavar as mãos regularmente", pontos: 10 },
        { id: "D2", nome: "Manter unhas limpas e cortadas", pontos: 10 },
        { id: "D3", nome: "Praticar atividade física", pontos: 10 },
        { id: "D4", nome: "Se alimentar na hora certa", pontos: 10 },
        { id: "D5", nome: "Comer frutas, legumes e verduras", pontos: 10 }
      ]
    },
    {
      codigo: "ODS4",
      nome: "Educação de Qualidade",
      acoes: [
        { id: "E1", nome: "Ler um pouco todos os dias", pontos: 10 },
        { id: "E2", nome: "Ajudar um colega nos estudos", pontos: 10 },
        { id: "E3", nome: "Organizar o material escolar", pontos: 10 },
        { id: "E4", nome: "Fazer o dever de casa", pontos: 10 },
        { id: "E5", nome: "Chegar no horário", pontos: 10 }
      ]
    }
  ];

  for (const m of missoes) {

    // UPSERT missão
    await db.query(
      `INSERT INTO missoes (codigo, nome)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE nome = VALUES(nome)`,
      [m.codigo, m.nome]
    );

    // Inserir ações
    for (const acao of m.acoes) {
      await db.query(
        `INSERT INTO acoes (id, nome, pontos, missao_codigo)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           nome = VALUES(nome),
           pontos = VALUES(pontos),
           missao_codigo = VALUES(missao_codigo)`,
        [acao.id, acao.nome, acao.pontos, m.codigo]
      );
    }
  }

  return { totalMissoes: missoes.length };
}