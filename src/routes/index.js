import express from "express";
import pessoas from "./pessoasRoutes.js";


const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send(asciiArt));
    app.use(express.json(), pessoas);
};

export default routes;