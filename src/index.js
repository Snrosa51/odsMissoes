require('dotenv').config();
const express = require('express');
const missionRoutes = require('./routes/missions');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API ODS Missões rodando!");
});

app.use('/api/missions', missionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

