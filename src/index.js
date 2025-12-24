const express = require("express");
const cors = require("cors");
const path = require("path");

const missionsRoutes = require("./routes/missions");
const respostasRoutes = require("./routes/respostas");
const rankingRoutes = require("./routes/ranking");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// =======================
// ROTAS DA API
// =======================
app.use("/api/missoes", missionsRoutes);
app.use("/api/respostas", respostasRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// HEALTHCHECK (UMA ÚNICA VEZ)
// =======================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// =======================
// FALLBACK FRONTEND
// =======================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

