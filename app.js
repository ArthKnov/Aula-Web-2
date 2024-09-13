const express = require("express")
const app = express ()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./modules/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone:req.body.telefone,
        origem:req.body.origem,
        data_contato:req.body.data_contato,
        observacao:req.body.observacao

    }).then(function(){
        console.log("Dados Cadastrados com sucesso!")
        res.send("Dados Cadastrados com sucesso!")
    }).catch(function(){
        console.log("Erro ao gravar os dados na entidade")
    })
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(posts){

    res.render("segunda_pagina", {posts})
    console.log(posts)
    })

})

app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then (
        function(posts){
            res.render("editar", {posts})
            console.log(posts)
        }
    )
})

app.listen(8083, function(){
    console.log("Servidor Ativo!")
})