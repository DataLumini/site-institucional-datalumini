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

module.exports = {
    listar
}