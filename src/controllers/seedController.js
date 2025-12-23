const db = require("../db");

exports.seedMissoes = async (req, res) => {
  try {
    // 🔥 dados oficiais das ODS (exemplo inicial)
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
          { id: "E1", nome: "Ler um pouco todos os dias (Li hoje)" },
          { id: "E2", nome: "Ajudar um colega nos estudos" },
          { id: "E3", nome: "Organizar o material escolar" },
          { id: "E4", nome: "Fazer o dever de casa" },
          { id: "E5", nome: "Chegar e sair da sala de aula no horário correto" }
        ]
      }
    ];

    // ⚠️ limpa a tabela (controlado)
    await db.query("DELETE FROM missions");

    // 🔁 insere novamente
    for (const m of missoes) {
      await db.query(
        `
        INSERT INTO missions (codigo, nome, acoes_json)
        VALUES (?, ?, ?)
        `,
        [
          m.codigo,
          m.nome,
          JSON.stringify(m.acoes)
        ]
      );
    }

    res.json({
      success: true,
      message: "Missões ODS inseridas com sucesso!",
      total: missoes.length
    });

  } catch (err) {
    console.error("Erro no seed de missões:", err);
    res.status(500).json({
      error: "Erro ao executar seed de missões"
    });
  }
};
