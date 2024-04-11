import express from "express";
import pessoaController from "../controllers/pessoaController.js";

const routes = express.Router();
routes.get("/pessoa", pessoaController.listarpessoa);
routes.get("/pessoa/:id", pessoaController.listarpessoaPorId);
routes.post("/pessoa", pessoaController.cadastrarpessoa);
routes.put("/pessoa/:id", pessoaController.atualizarpessoa);
export default routes;