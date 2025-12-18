require('dotenv').config();
const express = require('express');
const path = require('path');

const missionsRoutes = require('./routes/missions');
const respostasRoutes = require('./routes/respostas');
const rankingRoutes = require('./routes/ranking');

const app = express();

// =======================
// Middlewares
// =======================
app.use(express.json());

// =======================
// Frontend estático
// =======================
app.use(express.static(path.join(__dirname, '../public')));

// =======================
// Rota base (health check)
// =======================
app.get('/', (req, res) => {
  res.send('API ODS Missões rodando!');
});

// =======================
// API
// =======================
app.use('/api/missions', missionsRoutes);
app.use('/api/respostas', respostasRoutes);
app.use('/api/ranking', rankingRoutes);

// =======================
// Porta
// =======================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
