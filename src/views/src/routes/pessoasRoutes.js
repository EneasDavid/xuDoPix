import express from "express";
import PessoaController from "../controllers/pessoaController.js";

const routes = express.Router();

routes.get("/pessoa", PessoaController.listarPessoas);
routes.get("/pessoa/:id", PessoaController.listarPessoaPorId);
routes.post("/pessoa", PessoaController.criarPessoa);
routes.put("/pessoa/:id", PessoaController.atualizarPessoa)
routes.delete("/pessoa/:id", PessoaController.deletarPessoa);

export default routes;