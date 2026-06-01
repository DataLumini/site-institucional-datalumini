var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
          SELECT * 
        FROM vw_obter_dados_dash_principal 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obter_dados(idUsuario, idEstufa) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario, idEstufa);
    var instrucaoSql = `
          SELECT * 
        FROM vw_leituras_por_estufa 
        WHERE idUsuario = ${idUsuario} AND idEstufa = ${idEstufa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterUltimoAvisoPrincipal(idUsuario){
     console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
         SELECT Estufa, Setor, Estante, Prateleira, Sensor, FrequenciaLuminosa, DataLeitura FROM vw_obter_dados_dash_principal 
            WHERE idUsuario = ${idUsuario} 
            AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
            AND DataLeitura >= NOW() - INTERVAL 10 MINUTE
            ORDER BY DataLeitura DESC 
            LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal
};  