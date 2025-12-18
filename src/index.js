require('dotenv').config();
const express = require('express');
const path = require('path');

const missionRoutes = require('./routes/missions');
const respostasRoutes = require('./routes/respostas');
const rankingRoutes = require('./routes/ranking');

const app = express();

app.use(express.json());

/* 🔹 SERVIR FRONTEND */
app.use(express.static(path.join(__dirname, '../public')));

/* 🔹 ROTAS DA API */
app.use('/api/missions', missionRoutes);
app.use('/api/respostas', respostasRoutes);
app.use('/api/ranking', rankingRoutes);


/* 🔹 FALLBACK PARA SPA / FRONTEND */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
