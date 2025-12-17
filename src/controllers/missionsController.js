const db = require('../db');

// GET /api/missions – listar todas as missões
exports.getAll = (req, res) => {
    db.query("SELECT * FROM missions", (err, results) => {
        if (err) {
            console.error("Erro ao buscar missões:", err);
            return res.status(500).json({ error: "Erro ao buscar missões" });
        }
        res.json(results);
    });
};

// GET /api/missions/:id – buscar uma missão pelo ID
exports.getById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM missions WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar missão:", err);
            return res.status(500).json({ error: "Erro ao buscar missão" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Missão não encontrada" });
        }

        res.json(results[0]);
    });
};

// POST /api/missions – criar missão
exports.create = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Título e descrição são obrigatórios" });
    }

    db.query(
        "INSERT INTO missions (title, description) VALUES (?, ?)",
        [title, description],
        (err, result) => {
            if (err) {
                console.error("Erro ao criar missão:", err);
                return res.status(500).json({ error: "Erro ao criar missão" });
            }

            res.status(201).json({
                id: result.insertId,
                title,
                description
            });
        }
    );
};

// PUT /api/missions/:id – atualizar missão
exports.update = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    db.query(
        "UPDATE missions SET title = ?, description = ? WHERE id = ?",
        [title, description, id],
        (err, result) => {
            if (err) {
                console.error("Erro ao atualizar missão:", err);
                return res.status(500).json({ error: "Erro ao atualizar missão" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Missão não encontrada" });
            }

            res.json({
                id,
                title,
                description
            });
        }
    );
};

// DELETE /api/missions/:id – deletar missão
exports.remove = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM missions WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error("Erro ao deletar missão:", err);
                return res.status(500).json({ error: "Erro ao deletar missão" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Missão não encontrada" });
            }

            res.json({ message: "Missão deletada com sucesso" });
        }
    );
};
