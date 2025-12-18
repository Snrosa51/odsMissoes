const db = require("../db");

exports.create = (req, res) => {
  const { nome, serie, missaoTitulo, acoes } = req.body;

  if (!nome || !serie || !missaoTitulo || !Array.isArray(acoes)) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  const pontos = acoes.length * 10;

  const sql = `
    INSERT INTO respostas (nome, serie, missao_titulo, acoes, pontos)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome, serie, missaoTitulo, JSON.stringify(acoes), pontos],
    (err) => {
      if (err) {
        console.error("Erro MySQL:", err);
        return res.status(500).json({ error: "Erro ao salvar resposta." });
      }

      res.json({ message: "Resposta registrada com sucesso!", pontos });
    }
  );
};
