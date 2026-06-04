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

function obterDadosEstufas(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario);
    var instrucaoSql = `
        SELECT
        dados.idEstufa,
        dados.nome_estufa,
        CASE
            WHEN dados.alertas_criticos > 0 THEN 'Crítico'
            WHEN dados.alertas_atencao > 0 THEN 'Atenção'
            ELSE 'Ativo'
        END AS status_estufa,
        (dados.alertas_criticos + dados.alertas_atencao) AS total_alertas,
        dados.alertas_criticos,
        dados.alertas_atencao,
        dados.limiteMinimo,
        dados.limiteMaximo
    FROM (
        SELECT
            e.idEstufa,
            e.nome AS nome_estufa,
            e.limiteMinimo,
            e.limiteMaximo,
            COUNT(CASE
                WHEN l.frequenciaLuminosidade < e.limiteMinimo OR l.frequenciaLuminosidade > e.limiteMaximo
                THEN 1
            END) AS alertas_criticos,
            COUNT(CASE
                WHEN l.frequenciaLuminosidade BETWEEN e.limiteMinimo AND (e.limiteMinimo + (e.limiteMaximo - e.limiteMinimo) * 0.10)
                OR l.frequenciaLuminosidade BETWEEN (e.limiteMaximo - (e.limiteMaximo - e.limiteMinimo) * 0.10) AND e.limiteMaximo
                THEN 1
            END) AS alertas_atencao

        FROM Usuario_Estufa ue
        JOIN Estufa e ON ue.fkEstufa = e.idEstufa
        LEFT JOIN Setor s ON e.idEstufa = s.fkEstufa
        LEFT JOIN Estante est ON s.idSetor = est.fkSetor
        LEFT JOIN Prateleira p ON est.idEstante = p.fkEstante
        LEFT JOIN Sensor sen ON p.idPrateleira = sen.fkPrateleira
        LEFT JOIN Leitura l ON sen.idSensor = l.fkSensor
            AND l.dtCaptacaoDados >= NOW() - INTERVAL 24 HOUR
            
        WHERE ue.fkUsuario = ${idUsuario} 
        GROUP BY e.idEstufa, e.nome, e.limiteMinimo, e.limiteMaximo
    ) AS dados;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRegistrosAlertas(idEstufa) {

    console.log("Entrei no model");

    var instrucaoSql = `
    SELECT 
	es.nome AS estufa,
	s.nome AS setor,
    e.numeroIdentificador AS estante,
    p.numeroIdentificador AS prateleira,
    l.frequenciaLuminosidade AS ppfd,
    CASE 
    WHEN l.frequenciaLuminosidade <= 100 THEN 1
    WHEN l.frequenciaLuminosidade >= 200 THEN 1
    ELSE 2
    END AS status_ppfd
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
    WHERE (l.frequenciaLuminosidade <= 110 OR l.frequenciaLuminosidade >= 190)
    AND es.idEstufa = ${idEstufa}
    ORDER BY status_ppfd ASC
    `;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql, [idEstufa]);
}

function obterDadosAlertasSensor(idSensor, idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idSensor);
    var instrucaoSql = `
SELECT *
        FROM vw_alertas_leituras_24h
        WHERE idUsuario = ${idUsuario}
        AND idSensor = ${idSensor}
        ORDER BY DataLeitura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterAlertasCriticos24h(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Buscando alertas críticos (limites da estufa) nas últimas 24h para o usuário:", idUsuario);

    var instrucaoSql = `
        SELECT 
            es.idEstufa as IdEstufa,
            es.nome AS Estufa,
            s.nome AS Setor,
            est.numeroIdentificador AS Estante,
            p.numeroIdentificador AS Prateleira,
            l.frequenciaLuminosidade AS FrequenciaLuminosa
        FROM Usuario_Estufa ue
        JOIN Estufa es 
            ON ue.fkEstufa = es.idEstufa
        JOIN Setor s 
            ON es.idEstufa = s.fkEstufa
        JOIN Estante est 
            ON s.idSetor = est.fkSetor
        JOIN Prateleira p 
            ON est.idEstante = p.fkEstante
        JOIN Sensor sen 
            ON p.idPrateleira = sen.fkPrateleira
        JOIN Leitura l 
            ON sen.idSensor = l.fkSensor
        WHERE ue.fkUsuario = ${idUsuario}
          AND l.dtCaptacaoDados >= NOW() - INTERVAL 24 HOUR
          AND (l.frequenciaLuminosidade < es.limiteMinimo OR l.frequenciaLuminosidade > es.limiteMaximo)
        ORDER BY l.dtCaptacaoDados DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal,
    obterDadosAlertasSensor,
    obterUltimoEspecifica,

    //novas Rotas ajustadas
    obterDadosEstufas,
    obterTotalAlertasPrincipal,
    obterTotalAlertasEspecificas,
    obterRegistrosAlertas,
    obterDadosAlertasSensor,
    obterAlertasCriticos24h
};  