const express = require("express");
const cors = require("cors");

require("dotenv").config();

const sequelize = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();

// CORS (permite dashboard local e Railway)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// Rotas da API
app.use("/api", apiRoutes);

// Healthcheck (Railway gosta disso)
app.get("/", (req, res) => res.send("✅ Backend ODS rodando"));

// 🔧 Rota manual para rodar seeds (PROTEGIDA)
app.get("/admin/seed", async (req, res) => {
  try {
    const token = req.query.token;
    const expected = process.env.ADMIN_SEED_TOKEN;

    if (!expected) {
      return res
        .status(500)
        .send("ADMIN_SEED_TOKEN não definido no ambiente.");
    }

    if (token !== expected) {
      return res.status(401).send("Não autorizado.");
    }

    console.log("🌱 Executando seeds via /admin/seed ...");
    const seedMissoes = require("./seed/seedMissoes");
    const seedAcoes = require("./seed/seedAcoes");

    await seedMissoes();
    await seedAcoes();

    res.send("✅ Seeds executados com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao executar seeds:", err);
    res.status(500).send("Erro ao executar seeds.");
  }
});

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    console.log("🔗 Testando conexão com o banco...");
    await sequelize.authenticate();
    console.log("✅ Banco conectado.");

    console.log("🔄 Sincronizando modelos sem alterar tabelas...");
    await sequelize.sync(); // sem force/alter
    console.log("✅ Modelos sincronizados.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor ouvindo na porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ ERRO FATAL AO INICIAR O SERVIDOR:", err);
    process.exit(1);
  }
}

start();