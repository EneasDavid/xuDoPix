import express from "express";
import connect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const conexao = await connect();

app.use(cors()); // Usar o middleware CORS antes de qualquer outro middleware

app.use((request, response, next) => {
    // Permite chamadas de qualquer origem, porém reduz a segurança
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

conexao.on("error",(erro) =>{
    console.log("Erro de conexao",erro)
});

conexao.once("open",() =>{
    console.log("Conexao okei")
});

routes(app);

export default app;