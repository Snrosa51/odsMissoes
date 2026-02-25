const mysql = require("mysql2/promise");

const required = ["MYSQLHOST", "MYSQLUSER", "MYSQLPASSWORD", "MYSQLDATABASE"];
for (const k of required) {
  if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
}

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT || 3306),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

module.exports = pool;


