var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar/usuarios/empresa/:empresaId", function(req, res){
    usuarioController.listarUsuariosPorEmpresa(req, res);
});

router.get("/listar/estufas/usuario/:usuarioId", function(req, res){
    usuarioController.listarEstufasDoUsuario(req, res);
});

router.post("/adicionar/estufa", function(req, res){
    usuarioController.adicionarEstufa(req, res)
});

router.delete("/retirar/estufa", function(req, res){
    usuarioController.retirarEstufa(req, res)
})
module.exports = router;