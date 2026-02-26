const mysql = require("mysql2/promise");

function parseDatabaseUrl(url) {
  const u = new URL(url);

  return {
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

function validateEnv(vars) {
  for (const v of vars) {
    if (!process.env[v]) {
      throw new Error(`❌ Missing required env var: ${v}`);
    }
  }
}

// ===============================
// CONFIG PRIORITY
// 1️⃣ DATABASE_URL (Railway padrão)
// 2️⃣ Variáveis MYSQL* individuais
// ===============================

let config;

if (process.env.DATABASE_URL) {
  console.log("🔐 Using DATABASE_URL (Railway Private Network)");
  config = parseDatabaseUrl(process.env.DATABASE_URL);
} else {
  console.log("🔐 Using manual MYSQL* environment variables");

  validateEnv([
    "MYSQLHOST",
    "MYSQLUSER",
    "MYSQLPASSWORD",
    "MYSQLDATABASE",
  ]);

  config = {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT || 3306),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  };
}

const pool = mysql.createPool({
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL conectado com sucesso");
  } catch (err) {
    console.error("❌ Erro ao conectar no MySQL:", err.message);
  }
})();

module.exports = pool;