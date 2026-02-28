// index.js
const path = require("path");
const express = require("express");

// Só carrega dotenv no LOCAL.
// No Railway, as vars já vêm do painel.
if (process.env.RAILWAY_ENVIRONMENT == null) {
  require("dotenv").config({ path: process.env.DOTENV_PATH || ".env.local" });
}

const app = express();

// Segurança/robustez básica
app.disable("x-powered-by");
app.use(express.json({ limit: "200kb" }));

// Arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/api", require("./routes/missions"));
app.use("/api", require("./routes/respostas"));
app.use("/api", require("./routes/ranking"));

// Healthcheck
app.get("/health", (req, res) => res.json({ ok: true }));

// Página padrão
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor ouvindo em http://0.0.0.0:${PORT}`);
});