// src/index.js

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// APIs
console.log("Registrando rotas...");

app.use("/api/missions", require("./routes/missions"));
console.log("✓ /api/missoes");

app.use("/api/respostas", require("./routes/respostas"));
console.log("✓ /api/respostas");

app.use("/api/ranking", require("./routes/ranking"));
console.log("✓ /api/ranking");


// rota de teste (IMPORTANTE)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// =======================
// ROTA DIRETA /api/missoes (fallback seguro)
// =======================
const missionsController = require("./controllers/missionsController");

app.get("/api/missoes", async (req, res) => {
  try {
    console.log("GET /api/missoes chamado");
    await missionsController.getMissoes(req, res);
  } catch (err) {
    console.error("Erro em /api/missoes:", err);
    res.status(500).json({ erro: "Erro ao carregar missões" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

