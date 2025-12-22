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
app.use("/api/missions", require("./routes/missions"));
app.use("/api/respostas", require("./routes/respostas"));
app.use("/api/ranking", require("./routes/ranking"));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

