var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");
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
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        /* aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            }) */

                        // RESPOSTA MOCKADA SÓ PARA LIBERAR O ACESSO:
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            empresaId: resultadoAutenticar[0].empresaId,
                            aquarios: []
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (nomeEmpresa == undefined) {
        res.status(400).send("O nome da empresa está undefined!");
    } else {


        empresaModel.buscarPorNome(nomeEmpresa)
            .then((resultadoEmpresa) => {
                if (resultadoEmpresa.length > 0) {
                    console.log("Empresa encontrada: ", resultadoEmpresa[0]);
                    var empresaId = resultadoEmpresa[0].idEmpresa;
                    usuarioModel.cadastrar(nome, email, cpf, empresaId, senha)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                if (erro.sqlMessage.includes("Duplicate entry")) {
                                    res.status(400).send("O email já está em uso. Por favor, escolha outro email.");
                                } else {
                                    res.status(500).json(erro.sqlMessage);
                                }
                            }
                        );
                } else {
                    res.status(404).send("Empresa não encontrada. Verifique o nome informado.");
                }
            }).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar a empresa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
            );
    }
}

function listarUsuariosPorEmpresa(req, res) {
    var empresaId = req.params.empresaId;

    usuarioModel.buscarPorId(empresaId).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function listarEstufasDoUsuario(req, res) {
    var usuarioId = req.params.usuarioId;

    usuarioModel.listarEstufasDoUsuario(usuarioId).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function adicionarEstufa(req, res) {

    var estufaId = req.body.estufaIdServer;
    var usuarioId = req.body.usuarioIdServer;

    empresaModel.adicionarEstufa(idUsuario, idEstufa).then((resultado) => {
        res.status(201).json(resultado);
    });

}

function retirarEstufa(req, res) {

    var usuarioId = req.body.usuarioIdServer;
    var estufaId = req.body.estufaIdServer;

    empresaModel.ret(usuarioId, estufaId).then((resultado) => {
        res.status(201).json(resultado);
    });

}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuariosPorEmpresa,
    listarEstufasDoUsuario,
    adicionarEstufa
}