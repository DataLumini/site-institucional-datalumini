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

function obterUltimoAvisoPrincipal(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.obterUltimoAvisoPrincipal(idUsuario)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterUltimoAvisoEspecifica(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.obterUltimoAvisoPrincipal(idUsuario)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterDadosAlertasSensor(req, res) {
    var idSensor = req.params.idSensor;
    console.log("Entrei no controller alertas");

    if (idSensor == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.obterDadosAlertasSensor(idSensor)
            .then((resultado) => {
                return res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                return res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterTotalAlertasPrincipal(req, res) {
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.obterTotalAlertasPrincipal(idUsuario)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterTotalAlertasEspecificas(req, res) {
    var idUsuario = req.params.idUsuario;
    var idEstufa = req.params.idEstufa;

    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {

        dashboardModel.obterTotalAlertasEspecificas(idUsuario, idEstufa)
            .then((resultado) =>{
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterRegistrosAlertas(req,res){
    var idEstufa = req.params.idEstufa;

    if(idEstufa == undefined){
        res.status(400).send("O ID da estufa está undefined");
    }else{
        dashboardModel.obterRegistrosAlertas(idEstufa)
        .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            });
    }
}

function obterDadosEstufas(req, res) {
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {
        dashboardModel.obterDadosEstufas(idUsuario)
            .then((resultado) => {
                res.json(resultado);
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage)
            }
            );
    }
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal,
    obterUltimoAvisoEspecifica,
    obterDadosAlertasSensor,


    //novas Rotas ajustadas
    obterDadosEstufas,
    obterTotalAlertasPrincipal,
    obterTotalAlertasEspecificas,
    obterRegistrosAlertas
}