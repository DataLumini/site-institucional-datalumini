var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
       SELECT idUsuario as id, nome, email, fkEmpresa as empresaId, regra
        FROM Usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, cpf, empresaId, senha) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, cpf, fkEmpresa, senha) VALUES ('${nome}', '${email}', '${cpf}', ${empresaId}, '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuariosPorEmpresa(empresaId) {
    var instrucaoSql = `
        SELECT idUsuario, nome FROM Usuario WHERE fkEmpresa = ${empresaId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEstufasPorEmpresa(empresaId) {
    var instrucaoSql = `
        SELECT idEstufa, nome 
        FROM Estufa 
        WHERE fkEmpresa = ${empresaId};    
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuariosEstufaPorEmpresa(empresaId) {
    var instrucaoSql = `
        SELECT u.idUsuario, u.nome, e.idEstufa, e.nome as nomeEstufa 
        FROM Usuario u 
        LEFT JOIN Usuario_Estufa ue ON u.idUsuario = ue.fkUsuario 
        LEFT JOIN Estufa e ON ue.fkEstufa = e.idEstufa 
        WHERE u.fkEmpresa = ${empresaId}
        ORDER BY u.nome, e.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarEstufa(usuarioId, estufaId) {
    var instrucaoSql = `
        INSERT INTO Usuario_Estufa (fkUsuario, fkEstufa) VALUES (${usuarioId}, ${estufaId});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function retirarEstufa(usuarioId, estufaId) {
    var instrucaoSql = `
        DELETE FROM Usuario_Estufa WHERE fkUsuario = ${usuarioId} AND fkEstufa = ${estufaId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuariosPorEmpresa,
    listarEstufasPorEmpresa,
    listarUsuariosEstufaPorEmpresa,
    adicionarEstufa,
    retirarEstufa
};