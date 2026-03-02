require("dotenv").config();
const { executarSeed } = require("../src/controllers/seedController");

executarSeed()
  .then(() => {
    console.log("Seed finalizado!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });