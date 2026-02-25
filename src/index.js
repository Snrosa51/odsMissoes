// src/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const missionsRoutes = require("./routes/missions");
const respostasRoutes = require("./routes/respostas");
const rankingRoutes = require("./routes/ranking");
const adminRoutes = require("./routes/admin");

const seedController = require("./controllers/seedController");

const app = express();
const PORT = process.env.PORT || 3306;

// =======================
// Middlewares globais
// =======================
app.use(cors());
app.use(express.json());

// =======================
// SEED AUTOMÁTICO (BOOT)
// =======================
(async () => {
  if (process.env.RUN_SEED === "false") {
    console.log("🚀 RUN_SEED=false → executando seed automático");

    try {
      const result = await seedController.executarSeed();
      console.log("✅ Seed automático finalizado:", result);

      console.log(
        "⚠️ IMPORTANTE: após confirmar o seed, defina RUN_SEED=false no Railway"
      );
    } catch (err) {
      console.error("❌ Erro no seed automático:", err);
    }
  } else {
    console.log("ℹ️ RUN_SEED != false → seed automático ignorado");
  }
})();

// =======================
// Arquivos estáticos (frontend)
// =======================
app.use(express.static(path.join(__dirname, "../public")));

// =======================
// Rotas da API
// =======================
app.use("/api/missoes", missionsRoutes);
app.use("/api/respostas", respostasRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// Healthcheck (Railway)
// =======================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// =======================
// Fallback frontend (SPA)
// =======================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
