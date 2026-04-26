CREATE DATABASE historia_dos_games;
USE historia_dos_games;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45),
    email VARCHAR(80),
    senha VARCHAR(30),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partida (
	id INT AUTO_INCREMENT,
    id_usuario INT,
    pontuacao_player INT,
    pontuacao_cpu INT,
    duracao_segundos INT,
    data_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE conquista(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    descricao VARCHAR(200),
    requisito VARCHAR(50)
);

CREATE TABLE usuario_conquista(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
	id_conquista INT,
    data_conquista DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ctIdUsuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT ctIdConquista FOREIGN KEY (id_conquista) REFERENCES conquista(id)
);