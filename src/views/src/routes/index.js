import express from "express";
import pessoas from "./pessoasRoutes.js";
import dividas from "./dividaRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("roota padrão"));
    app.use(express.json(), pessoas);
    app.use(express.json(), dividas)
};

export default routes;