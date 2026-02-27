// db.js
const mysql = require("mysql2/promise");

/**
 * Railway: use DATABASE_URL (recomendado)
 * Local: use DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
 */
function getDbConfig() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim()) {
    const url = new URL(process.env.DATABASE_URL);
    return {
      host: url.hostname,
      port: Number(url.port || 3306),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ""),
      // Railway geralmente funciona sem ssl dentro da rede privada.
      // Se estiver usando host público externo, pode precisar ssl.
      // ssl: { rejectUnauthorized: false },
    };
  }

  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "odsMissoes",
  };
}

const cfg = getDbConfig();

const pool = mysql.createPool({
  ...cfg,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
  queueLimit: 0,
  connectTimeout: 10000,
});

module.exports = pool;