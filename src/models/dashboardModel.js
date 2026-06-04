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

function obterUltimoAvisoPrincipal(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
         SELECT Estufa, Setor, Estante, Prateleira, Sensor, FrequenciaLuminosa, DataLeitura FROM vw_obter_dados_dash_principal 
            WHERE idUsuario = ${idUsuario} 
            AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
            AND DataLeitura >= NOW() - INTERVAL 15 MINUTE
            ORDER BY DataLeitura DESC
            LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterUltimoEspecifica(idUsuario, idEstufa) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
         SELECT Estufa, Setor, Estante, Prateleira, Sensor, FrequenciaLuminosa, DataLeitura FROM vw_obter_dados_dash_principal 
            WHERE idUsuario = ${idUsuario} and idEstufa = ${idEstufa} 
            AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
            AND DataLeitura >= NOW() - INTERVAL 15 MINUTE
            ORDER BY DataLeitura DESC
            LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterDadosAlertasSensor(idSensor) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idSensor);
    var instrucaoSql = `
SELECT Prateleira, Sensor, FrequenciaLuminosa, DataLeitura
    FROM vw_obter_dados_dash_principal
    WHERE idSensor = ${idSensor}
    AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
    AND DataLeitura >= NOW() - INTERVAL 24 HOUR
    ORDER BY DataLeitura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterTotalAlertasPrincipal(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
         SELECT (
            SELECT 
                count(*)
                FROM vw_obter_dados_dash_principal 
                WHERE idUsuario = ${idUsuario} 
                AND (FrequenciaLuminosa BETWEEN 100 AND 120 OR FrequenciaLuminosa BETWEEN 180 AND 200)
                AND DataLeitura >= NOW() - INTERVAL 24 HOUR
            ) as 'totalMedios',
            (
                SELECT count(*) 
                FROM vw_obter_dados_dash_principal 
                WHERE idUsuario = ${idUsuario} 
                AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
                AND DataLeitura >= NOW() - INTERVAL 24 HOUR
            ) AS 'TotalCriticos';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTotalAlertasEspecificas(idUsuario, idEstufa) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
         SELECT (
            SELECT 
                count(*)
                FROM vw_obter_dados_dash_principal 
                WHERE idUsuario = ${idUsuario} AND idEstufa = ${idEstufa}
                AND (FrequenciaLuminosa BETWEEN 100 AND 120 OR FrequenciaLuminosa BETWEEN 180 AND 200)
                AND DataLeitura >= NOW() - INTERVAL 24 HOUR
            ) as 'totalMedios',
            (
                SELECT count(*) 
                FROM vw_obter_dados_dash_principal 
                WHERE idUsuario = ${idUsuario} AND idEstufa = ${idEstufa} 
                AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
                AND DataLeitura >= NOW() - INTERVAL 24 HOUR
            ) AS 'TotalCriticos';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRegistrosAlertas(idEstufa) {

    console.log("Entrei no model");

    var instrucaoSql = `
    SELECT 
        s.nome AS setor,
        e.numeroIdentificador AS estante,
        p.numeroIdentificador AS prateleira,
        l.frequenciaLuminosidade AS ppfd
    FROM estufa es
    JOIN setor s
        ON s.fkEstufa = es.idEstufa
    JOIN estante e 
        ON e.fkSetor = s.idSetor
    JOIN prateleira p 
        ON p.fkEstante = e.idEstante
    JOIN sensor ss
        ON ss.fkPrateleira = p.idPrateleira
    JOIN leitura l 
        ON l.fkSensor = ss.idSensor
    WHERE l.frequenciaLuminosidade <= 110 OR l.frequenciaLuminosidade >= 190
    AND es.idEstufa = ${idEstufa};
    `;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql, [idEstufa]);
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal,
    obterDadosAlertasSensor,
    obterUltimoEspecifica,
    obterTotalAlertasPrincipal,
    obterTotalAlertasEspecificas,
    obterRegistrosAlertas
};  