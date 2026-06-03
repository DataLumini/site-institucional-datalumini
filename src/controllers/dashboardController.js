var dashboardModel = require("../models/dashboardModel");

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.listar(idUsuario)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
function obter_dados(req, res) {
    var idUsuario = req.params.idUsuario;
    var idEstufa = req.params.idEstufa;

    if (idUsuario == undefined || idEstufa == undefined) {
        res.status(400).send("Os IDs do usuário e da estufa estão undefined!");
    } else {

        dashboardModel.obter_dados(idUsuario, idEstufa)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterUltimoAvisoPrincipal(req, res){
    var idUsuario = req.params.idUsuario;

    if(idUsuario == undefined){
        res.status(400).send("O ID do usuário está undefined!");
    } else{

        dashboardModel.obterUltimoAvisoPrincipal(idUsuario)
            .then((resultado) =>{
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterUltimoAvisoEspecifica(req, res){
    var idUsuario = req.params.idUsuario;

    if(idUsuario == undefined){
        res.status(400).send("O ID do usuário está undefined!");
    } else{

        dashboardModel.obterUltimoAvisoPrincipal(idUsuario)
            .then((resultado) =>{
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterDadosAlertasSensor(req, res){
    var idSensor = req.params.idSensor;

    if(idSensor == undefined){
        res.status(400).send("O ID do usuário está undefined!");
    } else{

        dashboardModel.obterDadosAlertasSensor(idSensor)
            .then((resultado) =>{
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal,
    obterUltimoAvisoEspecifica,
    obterDadosAlertasSensor
}