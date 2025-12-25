const db = require("../db");

exports.seedMissoes = async (req, res) => {
  try {
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
          { id: "E5", nome: "Chegar e sair da sala no horário correto" }
        ]
      }
    ];

    // 🔥 TRANSAÇÃO (segurança total)
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query("DELETE FROM missions");

      for (const m of missoes) {
        await conn.query(
          `INSERT INTO missions (codigo, nome, acoes_json)
           VALUES (?, ?, ?)`,
          [m.codigo, m.nome, JSON.stringify(m.acoes)]
        );
      }

      await conn.commit();

      res.json({
        success: true,
        message: "Missoes inseridas com sucesso",
        total: missoes.length
      });

    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

  } catch (err) {
    console.error("❌ ERRO NO SEED:", err);
    res.status(500).json({
      success: false,
      error: "Falha ao executar seed",
      details: err.message
    });
  }
};
