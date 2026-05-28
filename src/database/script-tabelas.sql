CREATE DATABASE datalumini;
USE datalumini;

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(255),
    cnpj CHAR(18),
    codigo VARCHAR(45)
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(255),
    email VARCHAR(255),
    cpf CHAR(11),
    fkEmpresa INT, 
    CONSTRAINT chfk_empresa_usuario FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Estufa (
    idEstufa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    limiteMaximo FLOAT,
    limiteMinimo FLOAT,
    status TINYINT,
    fkEmpresa INT,
    CONSTRAINT chfk_empresa_estufa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Usuario_Estufa (
    fkUsuario INT,
    fkEstufa INT,
    PRIMARY KEY (fkUsuario, fkEstufa),
    CONSTRAINT chfk_usuario_assoc FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT chfk_estufa_assoc FOREIGN KEY (fkEstufa) REFERENCES Estufa(idEstufa)
);

CREATE TABLE Setor (
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    fkEstufa INT,
    CONSTRAINT chfk_estufa_setor FOREIGN KEY (fkEstufa) REFERENCES Estufa(idEstufa)
);

CREATE TABLE Estante (
    idEstante INT PRIMARY KEY AUTO_INCREMENT,
    numeroIdentificador INT,
    fkSetor INT,
    CONSTRAINT chfk_setor_estante FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE Prateleira (
    idPrateleira INT PRIMARY KEY AUTO_INCREMENT,
    numeroIdentificador INT,
    fkEstante INT,
    CONSTRAINT chfk_estante_prateleira FOREIGN KEY (fkEstante) REFERENCES Estante(idEstante)
);

CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    dt_instalacao DATETIME,
    dt_atualizacao DATETIME,
    fkPrateleira INT,
    CONSTRAINT chfk_prateleira_sensor FOREIGN KEY (fkPrateleira) REFERENCES Prateleira(idPrateleira)
);

CREATE TABLE Leitura (
    idLeitura INT PRIMARY KEY AUTO_INCREMENT,
    frequenciaLuminosidade FLOAT,
    dtCaptacaoDados DATETIME DEFAULT NOW(),
    fkSensor INT,
    CONSTRAINT chfk_sensor_leitura FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

-- 1. Empresas (2 Empresas)
INSERT INTO Empresa (razaoSocial, cnpj, codigo) VALUES
('Laboratório de Biologia Vegetal USP', '11.111.111/0001-00', 'Ab12s'),
('Centro de Pesquisa Genética Unicamp', '22.222.222/0001-00', 'Ldh2a');

-- 2. Usuários (3 Usuários: 2 na USP, 1 na Unicamp)
INSERT INTO Usuario (nome, email, senha, cpf, fkEmpresa) VALUES
('Ana Ribeiro', 'ana.ribeiro@usp.br', 'usp123', '34567890123', 1),
('Carlos Lima', 'carlos.lima@usp.br', 'usp456', '45678901234', 1),
('Lucas Martins', 'lucas.martins@unicamp.br', 'unicamp123', '56789012345', 2);

-- 3. Estufas (2 por empresa = 4 Estufas)
INSERT INTO Estufa (nome, limiteMinimo, limiteMaximo, status, fkEmpresa) VALUES
('Estufa USP A', 100, 200, 1, 1), -- id 1
('Estufa USP B', 100, 200, 1, 1), -- id 2
('Estufa UNICAMP A', 100, 200, 1, 2), -- id 3
('Estufa UNICAMP B', 100, 200, 1, 2); -- id 4

-- 4. Associação Usuário x Estufa
INSERT INTO Usuario_Estufa (fkUsuario, fkEstufa) VALUES
(1, 1), (1, 2), -- Ana tem acesso às duas estufas da USP
(2, 1),         -- Carlos tem acesso só à estufa A da USP
(3, 3), (3, 4); -- Lucas tem acesso às duas estufas da Unicamp

-- 5. Setores (2 por Estufa = 8 Setores)
INSERT INTO Setor (nome, fkEstufa) VALUES
('Setor Norte', 1), ('Setor Sul', 1),   -- Estufa 1
('Setor Leste', 2), ('Setor Oeste', 2), -- Estufa 2
('Setor Norte', 3), ('Setor Sul', 3),   -- Estufa 3
('Setor Leste', 4), ('Setor Oeste', 4); -- Estufa 4

-- 6. Estantes (2 por Setor = 16 Estantes)
INSERT INTO Estante (numeroIdentificador, fkSetor) VALUES
(1, 1), (2, 1), (3, 2), (4, 2), -- Setores 1 e 2 (Estufa 1)
(5, 3), (6, 3), (7, 4), (8, 4), -- Setores 3 e 4 (Estufa 2)
(9, 5), (10, 5), (11, 6), (12, 6), -- Setores 5 e 6 (Estufa 3)
(13, 7), (14, 7), (15, 8), (16, 8); -- Setores 7 e 8 (Estufa 4)

-- 7. Prateleiras (4 por Estante = 64 Prateleiras)
INSERT INTO Prateleira (numeroIdentificador, fkEstante) VALUES
(1,1), (2,1), (3,1), (4,1), (1,2), (2,2), (3,2), (4,2),
(1,3), (2,3), (3,3), (4,3), (1,4), (2,4), (3,4), (4,4),
(1,5), (2,5), (3,5), (4,5), (1,6), (2,6), (3,6), (4,6),
(1,7), (2,7), (3,7), (4,7), (1,8), (2,8), (3,8), (4,8),
(1,9), (2,9), (3,9), (4,9), (1,10), (2,10), (3,10), (4,10),
(1,11), (2,11), (3,11), (4,11), (1,12), (2,12), (3,12), (4,12),
(1,13), (2,13), (3,13), (4,13), (1,14), (2,14), (3,14), (4,14),
(1,15), (2,15), (3,15), (4,15), (1,16), (2,16), (3,16), (4,16);

-- 8. Sensores (1 por Prateleira = 64 Sensores) 
INSERT INTO Sensor (nome, fkPrateleira) VALUES 
('S-01', 1), ('S-02', 2), ('S-03', 3), ('S-04', 4), 
('S-05', 5), ('S-06', 6), ('S-07', 7), ('S-08', 8), 
('S-09', 9), ('S-10', 10), ('S-11', 11), ('S-12', 12), 
('S-13', 13), ('S-14', 14), ('S-15', 15), ('S-16', 16), 
('S-17', 17), ('S-18', 18), ('S-19', 19), ('S-20', 20), 
('S-21', 21), ('S-22', 22), ('S-23', 23), ('S-24', 24), 
('S-25', 25), ('S-26', 26), ('S-27', 27), ('S-28', 28), 
('S-29', 29), ('S-30', 30), ('S-31', 31), ('S-32', 32), 
('S-33', 33), ('S-34', 34), ('S-35', 35), ('S-36', 36), 
('S-37', 37), ('S-38', 38), ('S-39', 39), ('S-40', 40), 
('S-41', 41), ('S-42', 42), ('S-43', 43), ('S-44', 44), 
('S-45', 45), ('S-46', 46), ('S-47', 47), ('S-48', 48), 
('S-49', 49), ('S-50', 50), ('S-51', 51), ('S-52', 52), 
('S-53', 53), ('S-54', 54), ('S-55', 55), ('S-56', 56), 
('S-57', 57), ('S-58', 58), ('S-59', 59), ('S-60', 60), 
('S-61', 61), ('S-62', 62), ('S-63', 63), ('S-64', 64);

INSERT INTO Leitura (frequenciaLuminosidade, fkSensor) VALUES 
-- ESTUFA 1 (USP A) - Sensores 1 a 16
(110.5, 1), (112.0, 2), (115.2, 3), (120.0, 4), 
(121.5, 5), (119.8, 6), (130.2, 7), (128.5, 8), 
(131.0, 9), (140.0, 10), (142.1, 11), (139.5, 12), 
(150.0, 13), (155.0, 14), (160.4, 15), (158.9, 16), 

-- ESTUFA 2 (USP B) - Sensores 17 a 32
(145.3, 17), (146.0, 18), (148.5, 19), (142.1, 20), 
(150.2, 21), (155.6, 22), (153.4, 23), (160.0, 24), 
(162.5, 25), (165.0, 26), (158.2, 27), (159.9, 28), 
(170.1, 29), (172.4, 30), (168.5, 31), (175.0, 32), 

-- ESTUFA 3 (UNICAMP A) - Sensores 33 a 48
(110.0, 33), (108.5, 34), (115.0, 35), (112.3, 36), 
(118.4, 37), (120.1, 38), (125.0, 39), (122.8, 40), 
(130.5, 41), (132.0, 42), (135.5, 43), (134.1, 44), 
(140.2, 45), (142.8, 46), (145.0, 47), (148.5, 48), 

-- ESTUFA 4 (UNICAMP B) - Sensores 49 a 64
(150.0, 49), (152.5, 50), (155.0, 51), (158.2, 52), 
(160.4, 53), (162.1, 54), (165.5, 55), (168.0, 56), 
(170.2, 57), (175.0, 58), (178.5, 59), (180.0, 60), 
(185.2, 61), (188.4, 62), (190.0, 63), (195.5, 64);



CREATE VIEW vw_obter_dados_dash_principal AS
SELECT 
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
    ON sen.idSensor = l.fkSensor;

CREATE VIEW vw_leituras_por_estufa AS
SELECT 
    u.idUsuario,
    es.idEstufa,
    es.nome AS Estufa,
    s.nome AS Setor,
    est.numeroIdentificador AS Estante,
    p.numeroIdentificador AS Prateleira,
    sen.nome AS Sensor,
    l.frequenciaLuminosidade AS FrequenciaLuminosa,
    l.dtCaptacaoDados AS DataLeitura
FROM Usuario u
JOIN Usuario_Estufa ue ON u.idUsuario = ue.fkUsuario
JOIN Estufa es ON ue.fkEstufa = es.idEstufa
JOIN Setor s ON es.idEstufa = s.fkEstufa
JOIN Estante est ON s.idSetor = est.fkSetor
JOIN Prateleira p ON est.idEstante = p.fkEstante
JOIN Sensor sen ON p.idPrateleira = sen.fkPrateleira
JOIN Leitura l ON sen.idSensor = l.fkSensor;

SELECT * FROM vw_obter_dados_dash_principal 
WHERE idUsuario = 2;

SELECT * FROM vw_leituras_por_estufa 
WHERE idUsuario = 2 AND idEstufa = 1;