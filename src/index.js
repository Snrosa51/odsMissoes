const express = require('express');
const missionRoutes = require('./routes/missions');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API ODS Missões rodando!");
});

app.use('/api/missions', missionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
