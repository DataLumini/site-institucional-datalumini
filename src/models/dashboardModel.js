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


function obterTotalAlertasPrincipal(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n function obterTotalAlertasPrincipal():", idUsuario);

    var instrucaoSql = `
        SELECT 
            SUM(CASE 
                WHEN l.frequenciaLuminosidade BETWEEN e.limiteMinimo AND (e.limiteMinimo + (e.limiteMaximo - e.limiteMinimo) * 0.10)
                OR l.frequenciaLuminosidade BETWEEN (e.limiteMaximo - (e.limiteMaximo - e.limiteMinimo) * 0.10) AND e.limiteMaximo
                THEN 1 ELSE 0 
            END) AS totalMedios,
            
            SUM(CASE 
                WHEN l.frequenciaLuminosidade < e.limiteMinimo OR l.frequenciaLuminosidade > e.limiteMaximo 
                THEN 1 ELSE 0 
            END) AS TotalCriticos
            
        FROM Usuario_Estufa ue
        JOIN Estufa e ON ue.fkEstufa = e.idEstufa
        JOIN Setor s ON e.idEstufa = s.fkEstufa
        JOIN Estante est ON s.idSetor = est.fkSetor
        JOIN Prateleira p ON est.idEstante = p.fkEstante
        JOIN Sensor sen ON p.idPrateleira = sen.fkPrateleira
        JOIN Leitura l ON sen.idSensor = l.fkSensor
        
        WHERE ue.fkUsuario = ${idUsuario}
          AND l.dtCaptacaoDados >= NOW() - INTERVAL 24 HOUR
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTotalAlertasEspecificas(idUsuario, idEstufa) {
    console.log("ACESSEI O DASHBOARD MODEL \n function obterTotalAlertasEspecificas():", idUsuario, idEstufa);

    var instrucaoSql = `
        SELECT 
            SUM(CASE 
                WHEN l.frequenciaLuminosidade BETWEEN e.limiteMinimo AND (e.limiteMinimo + (e.limiteMaximo - e.limiteMinimo) * 0.10)
                OR l.frequenciaLuminosidade BETWEEN (e.limiteMaximo - (e.limiteMaximo - e.limiteMinimo) * 0.10) AND e.limiteMaximo
                THEN 1 ELSE 0 
            END) AS totalMedios,
            
            SUM(CASE 
                WHEN l.frequenciaLuminosidade < e.limiteMinimo OR l.frequenciaLuminosidade > e.limiteMaximo 
                THEN 1 ELSE 0 
            END) AS TotalCriticos,
            
            SUM(CASE 
                WHEN l.frequenciaLuminosidade > (e.limiteMinimo + (e.limiteMaximo - e.limiteMinimo) * 0.10) 
                AND l.frequenciaLuminosidade < (e.limiteMaximo - (e.limiteMaximo - e.limiteMinimo) * 0.10) 
                THEN 1 ELSE 0 
            END) AS TotalNormais
            
        FROM Usuario_Estufa ue
        JOIN Estufa e ON ue.fkEstufa = e.idEstufa
        JOIN Setor s ON e.idEstufa = s.fkEstufa
        JOIN Estante est ON s.idSetor = est.fkSetor
        JOIN Prateleira p ON est.idEstante = p.fkEstante
        JOIN Sensor sen ON p.idPrateleira = sen.fkPrateleira
        JOIN Leitura l ON sen.idSensor = l.fkSensor
        
        WHERE ue.fkUsuario = ${idUsuario} 
          AND e.idEstufa = ${idEstufa}
          AND l.dtCaptacaoDados >= NOW() - INTERVAL 24 HOUR
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
            
        WHERE ue.fkUsuario = ${idUsuario} and l.status = 0
        GROUP BY e.idEstufa, e.nome, e.limiteMinimo, e.limiteMaximo
    ) AS dados;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obterRegistrosAlertas(idEstufa) {
    console.log("Entrei no model - obterRegistrosAlertas");

    var instrucaoSql = `
    SELECT 
        es.nome AS Estufa,
        s.nome AS Setor,
        e.numeroIdentificador AS Estante,
        p.numeroIdentificador AS Prateleira,
        ss.nome AS Sensor,
        l.idLeitura,
        l.frequenciaLuminosidade AS ppfd,
        CASE 
            WHEN l.frequenciaLuminosidade < es.limiteMinimo OR l.frequenciaLuminosidade > es.limiteMaximo THEN 1
            ELSE 2
        END AS status_ppfd,
        l.dtCaptacaoDados AS DataLeitura
    FROM Estufa es
    JOIN Setor s 
        ON s.fkEstufa = es.idEstufa
    JOIN Estante e 
        ON e.fkSetor = s.idSetor
    JOIN Prateleira p 
        ON p.fkEstante = e.idEstante
    JOIN Sensor ss 
        ON ss.fkPrateleira = p.idPrateleira
    JOIN Leitura l 
        ON l.fkSensor = ss.idSensor
    WHERE es.idEstufa = ${idEstufa}
      AND l.status = 0
      AND (
          l.frequenciaLuminosidade < es.limiteMinimo 
          OR l.frequenciaLuminosidade > es.limiteMaximo
          OR l.frequenciaLuminosidade BETWEEN es.limiteMinimo AND (es.limiteMinimo + (es.limiteMaximo - es.limiteMinimo) * 0.10)
          OR l.frequenciaLuminosidade BETWEEN (es.limiteMaximo - (es.limiteMaximo - es.limiteMinimo) * 0.10) AND es.limiteMaximo
      )
      AND l.idLeitura IN (
          SELECT MAX(idLeitura) 
          FROM Leitura 
          GROUP BY fkSensor
      )
    ORDER BY status_ppfd ASC, l.dtCaptacaoDados DESC;
    `;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}
function obterDadosAlertasSensor(idSensor, idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n function obterDadosAlertasSensor():", idSensor);

    var instrucaoSql = "";
    if (idUsuario) {
        instrucaoSql = `
            SELECT *
            FROM vw_alertas_leituras_24h
            WHERE idUsuario = ${idUsuario}
            AND idSensor = ${idSensor}
            ORDER BY DataLeitura DESC;
        `;
    } else {
        instrucaoSql = `
            SELECT Prateleira, Sensor, FrequenciaLuminosa, DataLeitura, idLeitura
            FROM vw_obter_dados_dash_principal
            WHERE idSensor = ${idSensor}
            AND FrequenciaLuminosa NOT BETWEEN 100 AND 200
            AND DataLeitura >= NOW() - INTERVAL 24 HOUR
            ORDER BY DataLeitura DESC;
        `;
    }
    return database.executar(instrucaoSql);
}

function obterAlertasCriticos24h(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Buscando alertas críticos nas últimas 24h para o usuário:", idUsuario);

    var instrucaoSql = `
        SELECT 
            es.idEstufa as IdEstufa,
            es.nome AS Estufa,
            s.nome AS Setor,
            est.numeroIdentificador AS Estante,
            p.numeroIdentificador AS Prateleira,
            sen.nome AS Sensor,
            sen.idSensor,
            l.idLeitura,
            l.frequenciaLuminosidade AS FrequenciaLuminosa,
            l.dtCaptacaoDados AS DataLeitura
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
          AND l.status = 0
          AND l.idLeitura IN (
              SELECT MAX(idLeitura) 
              FROM Leitura 
              GROUP BY fkSensor
          )
        ORDER BY l.dtCaptacaoDados DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterPontosDeAtencao24h(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Buscando pontos de atenção nas últimas 24h para o usuário:", idUsuario);

    var instrucaoSql = `
        SELECT 
            es.idEstufa as IdEstufa,
            es.nome AS Estufa,
            s.nome AS Setor,
            est.numeroIdentificador AS Estante,
            p.numeroIdentificador AS Prateleira,
            sen.nome AS Sensor,
            sen.idSensor,
            l.idLeitura,
            l.frequenciaLuminosidade AS FrequenciaLuminosa,
            l.dtCaptacaoDados AS DataLeitura
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
          AND (
              l.frequenciaLuminosidade BETWEEN es.limiteMinimo AND (es.limiteMinimo + (es.limiteMaximo - es.limiteMinimo) * 0.10)
              OR 
              l.frequenciaLuminosidade BETWEEN (es.limiteMaximo - (es.limiteMaximo - es.limiteMinimo) * 0.10) AND es.limiteMaximo
          )
          AND l.status = 0
          AND l.idLeitura IN (
              SELECT MAX(idLeitura) 
              FROM Leitura 
              GROUP BY fkSensor
          )
        ORDER BY l.dtCaptacaoDados DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function prateleirasPorSetor(idSetor) {
    var instrucaoSql = `
        SELECT 
            v.*,
            (
                SELECT COUNT(l.idLeitura) 
                FROM Leitura l
                JOIN Estufa es ON es.idEstufa = v.idEstufa
                WHERE l.fkSensor = v.idSensor
                AND l.status = 0
                AND (
                    l.frequenciaLuminosidade <= (es.limiteMinimo + (es.limiteMaximo - es.limiteMinimo) * 0.10)
                    OR 
                    l.frequenciaLuminosidade >= (es.limiteMaximo - (es.limiteMaximo - es.limiteMinimo) * 0.10)
                )
            ) AS qtdAlertas
        FROM vw_prateleiras_por_setor v
        WHERE v.idSetor = ${idSetor}
        ORDER BY 
            v.Estante ASC, 
            v.Prioridade ASC, 
            v.Prateleira ASC;
    `;

    return database.executar(instrucaoSql);
}

function ficarCiente(idLeitura) {
    console.log("ACESSEI O DASHBOARD MODEL \n function ficarCiente():", idLeitura);
    var instrucaoSql = `
        UPDATE Leitura
        SET status = 1
        WHERE idLeitura = ${idLeitura};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    obter_dados,
    obterUltimoAvisoPrincipal,
    obterUltimoEspecifica,
    obterDadosEstufas,
    obterTotalAlertasPrincipal,
    obterTotalAlertasEspecificas,
    obterRegistrosAlertas,
    obterDadosAlertasSensor,
    obterAlertasCriticos24h,
    obterPontosDeAtencao24h,
    prateleirasPorSetor,
    ficarCiente
};  