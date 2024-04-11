import express from "express";
import pessoas from "./pessoasRoutes.js";//Esse "livros" é um Alias( apelido ) que estamos chamando o routes lá do livrosRoutes.JS

//Criando um "Barril" que vai juntar a rota do livro com a rota "geral" = "/"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    app.use(express.json(), pessoas);
};

export default routes;