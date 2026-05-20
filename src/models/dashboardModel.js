var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O DASHBOARD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPrateleira():", idUsuario );
            var instrucaoSql = `
        SELECT 
            es.nome AS Estufa,
            s.nome AS Setor,
            est.numeroIdentificador AS Estante,
            p.numeroIdentificador AS Prateleira,
            sen.nome AS Sensor,
            l.frequenciaLuminosidade AS FrequenciaLuminosa,
            l.dtCaptacaoDados AS DataLeitura
        FROM Usuario u
        JOIN Empresa e 
            ON u.fkEmpresa = e.idEmpresa
        JOIN Estufa es 
            ON e.idEmpresa = es.fkEmpresa
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
        WHERE 
            u.idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};  