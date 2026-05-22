var database = require("../database/config");

function obter_dados(){
    var instrucaoSql = `SELECT 
    u.idUsuario,
	es.idEstufa,
    u.nome AS NomeUsuario,
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
    ON sen.idSensor = l.fkSensor;`

      return database.executar(instrucaoSql);
}

module.exports ={
    obter_dados
}
