import express from "express";
import connect from "./config/dbConnect.js";

import routes from "./routes/index.js";

const app = express();
const conexao = await connect();
routes(app);
app.use(express.json());


conexao.on("error",(erro) =>{
    console.log("Erro de conexao, okei?:",erro)
});

conexao.once("open",() =>{
    console.log("Conexao okei")
});

export default app;