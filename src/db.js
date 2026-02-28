// db.js
const mysql = require("mysql2/promise");

function isTruthy(v) {
  return ["1", "true", "yes", "on"].includes(String(v || "").toLowerCase());
}

function getDbConfig() {
  // Railway / produção via URL
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim()) {
    let url;
    try {
      url = new URL(process.env.DATABASE_URL);
    } catch (e) {
      // Falha cedo com erro útil (sem vazar credenciais)
      throw new Error("DATABASE_URL inválida: verifique se contém o esquema (ex.: mysql://...)");
    }

    const db = url.pathname.replace(/^\//, "");
    const sslFromUrl = isTruthy(url.searchParams.get("ssl"));
    const sslFromEnv = isTruthy(process.env.DB_SSL);

    const cfg = {
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: db,
    };

    // TLS opcional (use só se necessário)
    if (sslFromUrl || sslFromEnv) {
      cfg.ssl = { rejectUnauthorized: false };
    }

    return cfg;
  }

  // Local / fallback
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "odsMissoes",
    ...(isTruthy(process.env.DB_SSL) ? { ssl: { rejectUnauthorized: false } } : {}),
  };
}

const cfg = getDbConfig();

const pool = mysql.createPool({
  ...cfg,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true,
  // namedPlaceholders: true,
});

module.exports = pool;