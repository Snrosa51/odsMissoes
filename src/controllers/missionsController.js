// src/controllers/missionsController.js
const db = require('../db');

exports.listarMissoes = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT ods_codigo, nome, acoes_json FROM missions'
    );

    const missions = rows.map(row => ({
      ods_codigo: row.ods_codigo,
      nome: row.nome,
      acoes: row.acoes_json ? JSON.parse(row.acoes_json) : []
    }));

    res.json(missions);
  } catch (error) {
    console.error('Erro ao listar missões:', error);
    res.status(500).json({ error: 'Erro ao buscar missões' });
  }
};

