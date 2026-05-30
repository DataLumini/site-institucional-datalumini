var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar/usuarios/empresa/:empresaId", function(req, res){
    usuarioController.listarUsuariosPorEmpresa(req, res);
});

router.get("/listar/estufas/empresa/:empresaId", function(req, res){
    usuarioController.listarEstufasPorEmpresa(req, res);
});

router.get("/listar/estufas/usuario/:empresaId", function(req, res){
    usuarioController.listarUsuariosEstufaPorEmpresa(req, res);
}); 

router.post("/adicionar/estufa", function(req, res){
    usuarioController.adicionarEstufa(req, res);
});

router.delete("/retirar/estufa", function(req, res){
    usuarioController.retirarEstufa(req, res);
});

module.exports = router;