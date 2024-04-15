import express from "express";
import DividaController from "../controllers/dividaController.js";

const routes = express.Router();
routes.get("/divida", DividaController.listarDividas);
routes.get("/divida/:id", DividaController.listarDividaPorId);
routes.post("/divida", DividaController.criarDivida);
routes.put("/divida/:id", DividaController.atualizarDivida);
routes.put("/divida/pagar/:id", DividaController.pagarDivida);
routes.delete("/divida/:id", DividaController.deletarDivida);
export default routes;