const db = require("../db");

exports.listarMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, codigo, nome, acoes_json
      FROM missions
      ORDER BY id
    `);

    const missoes = rows.map(m => {
      let acoes = [];

      if (m.acoes_json) {
        try {
          // Se vier como string → parse
          if (typeof m.acoes_json === "string") {
            acoes = JSON.parse(m.acoes_json);
          }
          // Se já vier como objeto → usa direto
          else if (Array.isArray(m.acoes_json)) {
            acoes = m.acoes_json;
          }
        } catch (e) {
          console.error(
            `JSON inválido em missions.id=${m.id}:`,
            m.acoes_json
          );
          acoes = [];
        }
      }

      return {
        id: m.id,
        codigo: m.codigo,
        nome: m.nome,
        acoes
      };
    });

    res.json(missoes);

  } catch (err) {
    console.error("Erro ao buscar missões:", err);
    res.status(500).json({
      error: "Erro ao buscar missões"
    });
  }
};
