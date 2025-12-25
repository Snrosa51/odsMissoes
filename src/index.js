const express = require("express");
const cors = require("cors");
const path = require("path");

const missionsRoutes = require("./routes/missions");
const respostasRoutes = require("./routes/respostas");
const rankingRoutes = require("./routes/ranking");
const seedRoutes = require("./routes/seed");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "../public")));

// API
app.use("/api/missoes", missionsRoutes);
app.use("/api/respostas", respostasRoutes);
app.use("/api/ranking", rankingRoutes);

// 🚨 SEED (isolado e claro)
app.use("/", seedRoutes);

// health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// fallback frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
