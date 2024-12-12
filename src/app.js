require("dotenv").config(); 
const express = require("express");
const router = require("./routers/router");
const { sequelize } = require("./models");

const app = express(); 

app.use(express.json()); 
app.use("/api", router);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexao com o banco de dados deu certo");
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco: ", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("-------------------------");
  console.log(`Running on http://${PORT}`);
  console.log("-------------------------");
});