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
    regra tinyint default 0,
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
    dataHora DATETIME DEFAULT NOW(),
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
INSERT INTO Usuario (nome, email, senha, cpf, fkEmpresa, regra) VALUES
('Bia', 'bia@gmail.com', 'usp123', '123123', 1, 0),
('Guilherme', 'guilherme@gmail.com', '123123', '45678901234', 1, 1),
('Gabriel', 'gabriel@gmail.com', '123123', '56789012345', 2, 2);

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

-- SETORES
INSERT INTO Setor (nome, fkEstufa) VALUES
('Setor Norte', 1), ('Setor Sul', 1),
('Setor Norte', 2), ('Setor Sul', 2),
('Setor Norte', 3), ('Setor Sul', 3),
('Setor Norte', 4), ('Setor Sul', 4);

-- ESTANTES
-- Cada setor tem Estante 1 e Estante 2
INSERT INTO Estante (numeroIdentificador, fkSetor) VALUES
(1, 1), (2, 1),
(1, 2), (2, 2),
(1, 3), (2, 3),
(1, 4), (2, 4),
(1, 5), (2, 5),
(1, 6), (2, 6),
(1, 7), (2, 7),
(1, 8), (2, 8);

-- PRATELEIRAS
-- Cada estante tem Prateleira 1, 2, 3 e 4
INSERT INTO Prateleira (numeroIdentificador, fkEstante) VALUES
(1,1), (2,1), (3,1), (4,1),
(1,2), (2,2), (3,2), (4,2),

(1,3), (2,3), (3,3), (4,3),
(1,4), (2,4), (3,4), (4,4),

(1,5), (2,5), (3,5), (4,5),
(1,6), (2,6), (3,6), (4,6),

(1,7), (2,7), (3,7), (4,7),
(1,8), (2,8), (3,8), (4,8),

(1,9), (2,9), (3,9), (4,9),
(1,10), (2,10), (3,10), (4,10),

(1,11), (2,11), (3,11), (4,11),
(1,12), (2,12), (3,12), (4,12),

(1,13), (2,13), (3,13), (4,13),
(1,14), (2,14), (3,14), (4,14),

(1,15), (2,15), (3,15), (4,15),
(1,16), (2,16), (3,16), (4,16);
 
 -- 8. Sensores
-- 1 sensor por prateleira
-- Como existem 64 prateleiras, existem 64 sensores
INSERT INTO Sensor (nome, fkPrateleira) VALUES
('S-01', 1),  ('S-02', 2),  ('S-03', 3),  ('S-04', 4),
('S-05', 5),  ('S-06', 6),  ('S-07', 7),  ('S-08', 8),
('S-09', 9),  ('S-10', 10), ('S-11', 11), ('S-12', 12),
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

-- 9. Leituras
-- 1 leitura por sensor
INSERT INTO Leitura (frequenciaLuminosidade, fkSensor) VALUES 
-- ESTUFA 1 USP A - Sensores 1 a 16
(107, 1),   -- Atenção
(112, 2),   -- Normal
(115.2, 3), -- Normal
(90, 4),    -- Crítico

(121.5, 5), -- Normal
(119.8, 6), -- Normal
(130.2, 7), -- Normal
(128.5, 8), -- Normal

(131, 9),   -- Normal
(140, 10),  -- Normal
(142.1, 11),-- Normal
(139.5, 12),-- Normal

(150, 13),  -- Normal
(155, 14),  -- Normal
(160.4, 15),-- Normal
(158.9, 16),-- Normal


-- ESTUFA 2 USP B - Sensores 17 a 32
(145.3, 17), -- Normal
(146, 18),   -- Normal
(148.5, 19), -- Normal
(142.1, 20), -- Normal

(150.2, 21), -- Normal
(155.6, 22), -- Normal
(153.4, 23), -- Normal
(160, 24),   -- Normal

(162.5, 25), -- Normal
(165, 26),   -- Normal
(158.2, 27), -- Normal
(159.9, 28), -- Normal

(170.1, 29), -- Normal
(172.4, 30), -- Normal
(168.5, 31), -- Normal
(175, 32),   -- Normal


-- ESTUFA 3 UNICAMP A - Sensores 33 a 48
(110, 33),   -- Atenção
(108.5, 34), -- Atenção
(115, 35),   -- Normal
(112.3, 36), -- Normal

(118.4, 37), -- Normal
(120.1, 38), -- Normal
(125, 39),   -- Normal
(122.8, 40), -- Normal

(130.5, 41), -- Normal
(132, 42),   -- Normal
(135.5, 43), -- Normal
(134.1, 44), -- Normal

(140.2, 45), -- Normal
(142.8, 46), -- Normal
(145, 47),   -- Normal
(148.5, 48), -- Normal


-- ESTUFA 4 UNICAMP B - Sensores 49 a 64
(150, 49),   -- Normal
(152.5, 50), -- Normal
(155, 51),   -- Normal
(158.2, 52), -- Normal

(160.4, 53), -- Normal
(162.1, 54), -- Normal
(165.5, 55), -- Normal
(168, 56),   -- Normal

(170.2, 57), -- Normal
(175, 58),   -- Normal
(178.5, 59), -- Normal
(180, 60),   -- Normal

(185.2, 61), -- Normal
(188.4, 62), -- Normal
(190, 63),   -- Atenção
(195.5, 64); -- Atenção


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