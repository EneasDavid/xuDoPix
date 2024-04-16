DROP DATABASE IF EXISTS xudopix;

CREATE DATABASE xudopix;

USE xudopix;

CREATE TABLE pessoas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    senha VARCHAR(255),
    cpf VARCHAR(14)
);

CREATE TABLE divida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_fiador INT,
    id_devedor INT,
    valor DOUBLE,
    situacao BOOLEAN,
    prazoPagar DATE,
    dataCriacao DATE,
    FOREIGN KEY (id_fiador) REFERENCES pessoas(id),
    FOREIGN KEY (id_devedor) REFERENCES pessoas(id)
);

-- Inserindo alguns dados na tabela pessoas
INSERT INTO pessoas (nome, senha, cpf) VALUES
('João', 'senha123', '123.456.789-01'),
('Maria', 'senha456', '987.654.321-09'),
('Pedro', 'senha789', '456.789.123-45');

-- Inserindo algumas dívidas
INSERT INTO divida (id_fiador, id_devedor, valor, situacao, dataCriacao) VALUES
(1, 2, 1000.00, FALSE, '2024-04-20'),
(3, 1, 1500.00, FALSE, '2024-04-22'),
(2, 3, 800.00, TRUE, '2024-04-25');

-- para as dividas ativas
SELECT divida.*, pessoas.nome FROM divida
INNER JOIN pessoas ON divida.id_devedor = pessoas.id WHERE divida.situacao = FALSE;

-- para o historico
SELECT divida.*, pessoas.nome FROM divida
INNER JOIN pessoas ON divida.id_devedor = pessoas.id WHERE divida.situacao = TRUE;


UPDATE divida SET situacao = FALSE WHERE id = 2;




