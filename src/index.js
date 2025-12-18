const express = require('express');
const missionRoutes = require('./routes/missions');

const respostasRoutes = require("./routes/respostas");


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API ODS Missões rodando!");
});

app.use('/api/missions', missionRoutes);

app.use("/api/respostas", respostasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
