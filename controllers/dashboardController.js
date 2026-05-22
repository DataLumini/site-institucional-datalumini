var dashboardModel = require("../models/dashboardModel");

function obter_dados(req, res) {
    dashboardModel.obter_dados()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obter_dados
};
