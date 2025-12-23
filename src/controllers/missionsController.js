const db = require("../db");

exports.listarMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, codigo, nome, acoes_json
      FROM missions
      ORDER BY id
    `);

    const missoes = rows.map(m => ({
      id: m.id,                 // usado internamente
      codigo: m.codigo,         // exibido (ex: ODS3)
      nome: m.nome,
      acoes: m.acoes_json ? JSON.parse(m.acoes_json) : []
    }));

    res.json(missoes);

  } catch (err) {
    console.error("Erro ao buscar missões:", err);
    res.status(500).json({
      error: "Erro ao buscar missões"
    });
  }
};
