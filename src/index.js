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

app.use("/api/missoes", require("./routes/missions"));
console.log("✓ /api/missoes");

app.use("/api/respostas", require("./routes/respostas"));
console.log("✓ /api/respostas");

app.use("/api/ranking", require("./routes/ranking"));
console.log("✓ /api/ranking");


// rota de teste (IMPORTANTE)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

