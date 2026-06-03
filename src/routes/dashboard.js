var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/listar/:idUsuario", function (req, res) {
    dashboardController.listar(req, res);
})

router.get("/obterDados/:idUsuario/:idEstufa", function (req, res) {
    dashboardController.obter_dados(req, res);
})

router.get("/obterUltimoAviso/Principal/:idUsuario", function(req, res){
    dashboardController.obterUltimoAvisoPrincipal(req, res)
})

router.get("/obterUltimoAviso/Especifica/:idUsuario/:idEstufa", function(req, res){
    dashboardController.obterUltimoAvisoEspecifica(req, res)
})

router.get("/obterDadosSensor/:idSensor", function(req, res){
    dashboardController.obterDadosAlertasSensor(req, res)
}) 

router.get("/obterTotalAlertas/principal/:idUsuario", function(req, res){
    dashboardController.obterTotalAlertas(req, res)
})

module.exports = router;