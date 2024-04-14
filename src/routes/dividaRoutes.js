import express from "express";
import DividaController from "../controllers/dividaController.js";

const routes = express.Router();
routes.get("/divida", DividaController.listarDividas);
routes.get("/divida/:id", DividaController.listarDividaPorId);
routes.post("/divida", DividaController.criarDivida);
routes.put("/divida/:id", DividaController.atualizarDivida);
routes.put("/divida/pagar/:id", DividaController.pagarDivida);
/*
Aqui fico na duvida se pagarDivida vai ser POST ou PUT
R - 
Quando uma pessoa paga uma divida, nos compreendemos em uma exclusão da divida,
porém para programação podemos manter a divida e alterar o compo "status" ou "pago" 
para true indicando que já foi pago e mantendo um historico de transações no banco 
de dados, o que fica mais proximo de um banco usado por grandes empresas, logo, a 
route "dividaPagar" precisa de uma URL diferente e também precisa ser um PUT para
quer assim possamos apenas atualziar esse campo, e no controller basta criar uma 
função que apenas altera esse campo.

*/
routes.delete("/divida/:id", DividaController.deletarDivida);
export default routes;