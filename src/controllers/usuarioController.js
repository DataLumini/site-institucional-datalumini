var usuarioModel = require("../models/usuarioModel");
var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        empresaId: resultadoAutenticar[0].empresaId,
                        regra: resultadoAutenticar[0].regra
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var codigo_ativacao = req.body.empresaServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (codigo_ativacao == undefined) {
        res.status(400).send("O código da empresa está undefined!");
    } else {
        empresaModel.buscarPorCodigo(codigo_ativacao)
            .then((resultadoEmpresa) => {
                if (resultadoEmpresa.length > 0) {
                    console.log("Empresa encontrada: ", resultadoEmpresa[0]);
                    var empresaId = resultadoEmpresa[0].idEmpresa;

                    usuarioModel.cadastrar(nome, email, cpf, empresaId, senha)
                        .then(function (resultado) {
                            res.json(resultado);
                        }).catch(function (erro) {
                            console.log(erro);
                            if (erro.sqlMessage.includes("Duplicate entry")) {
                                res.status(400).send("O email já está em uso. Por favor, escolha outro email.");
                            } else {
                                res.status(500).json(erro.sqlMessage);
                            }
                        });
                } else {
                    res.status(404).send("Empresa não encontrada. Verifique o nome informado.");
                }
            }).catch((erro) => {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarUsuariosPorEmpresa(req, res) {
    var empresaId = req.params.empresaId;
    if (empresaId == undefined) {
        res.status(400).send("empresaId está undefined.");
        return;
    }
    usuarioModel.listarUsuariosPorEmpresa(empresaId)
        .then((resultado) => { res.status(200).json(resultado); })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function listarEstufasPorEmpresa(req, res) {
    var empresaId = req.params.empresaId;
    if (empresaId == undefined) {
        res.status(400).send("empresaId está undefined.");
        return;
    }
    usuarioModel.listarEstufasPorEmpresa(empresaId)
        .then((resultado) => { res.status(200).json(resultado); })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function listarUsuariosEstufaPorEmpresa(req, res) {
    var empresaId = req.params.empresaId;
    if (empresaId == undefined) {
        res.status(400).send("empresaId está undefined.");
        return;
    }
    usuarioModel.listarUsuariosEstufaPorEmpresa(empresaId)
        .then((resultado) => { res.status(200).json(resultado); })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function adicionarEstufa(req, res) {
    var estufaId = req.body.estufaIdServer;
    var usuarioId = req.body.usuarioIdServer;

    if (usuarioId == undefined || estufaId == undefined) {
        res.status(400).send("usuarioId ou estufaId undefined.");
        return;
    }
    usuarioModel.adicionarEstufa(usuarioId, estufaId)
        .then((resultado) => { res.status(201).json(resultado); })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

function retirarEstufa(req, res) {
    var usuarioId = req.body.usuarioIdServer;
    var estufaId = req.body.estufaIdServer;

    if (usuarioId == undefined || estufaId == undefined) {
        res.status(400).send("usuarioId ou estufaId undefined.");
        return;
    }
    usuarioModel.retirarEstufa(usuarioId, estufaId)
        .then((resultado) => { res.status(200).json(resultado); })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuariosPorEmpresa,
    listarEstufasPorEmpresa,
    listarUsuariosEstufaPorEmpresa,
    adicionarEstufa,
    retirarEstufa,
};