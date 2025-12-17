const mysql = require("mysql2");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("MySQL conectado com sucesso!");
    }
});

module.exports = db;
