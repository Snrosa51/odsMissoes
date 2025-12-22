// src/db.js

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// teste inicial de conexão
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL pool conectado com sucesso!");
    conn.release();
  } catch (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  }
})();

module.exports = pool;


