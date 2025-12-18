require('dotenv').config();
const express = require('express');

const missionRoutes = require('./routes/missions');
const respostasRoutes = require('./routes/respostas');
const rankingRoutes = require('./routes/ranking');

const app = express();
app.use(express.json());

// rota raiz (IMPORTANTE)
app.get('/', (req, res) => {
  res.send('API ODS Missões rodando!');
});

// rotas da API
app.use('/api/missions', missionRoutes);
app.use('/api/respostas', respostasRoutes);
app.use('/api/ranking', rankingRoutes);

// 🚨 NUNCA fixe porta no Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
