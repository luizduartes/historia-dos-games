CREATE DATABASE historia_dos_games;
USE historia_dos_games;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    senha VARCHAR(30) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    vitorias INT DEFAULT 0,
    derrotas INT DEFAULT 0,
    win_streak_atual INT DEFAULT 0,
    melhor_win_streak INT DEFAULT 0
);

CREATE TABLE partida (
	id INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    pontuacao_player INT NOT NULL,
    pontuacao_cpu INT NOT NULL,
    duracao_segundos INT NOT NULL,
    data_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
    resultado VARCHAR(30) NOT NULL,
    PRIMARY KEY(id, id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT ctResultado CHECK(resultado IN ('VITORIA', 'DERROTA'))
);

CREATE TABLE conquista(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    valor INT NOT NULL,
    CONSTRAINT ctTipo CHECK(tipo IN ('VITORIA', 'WIN_STREAK', 'DURACAO', 'PARTIDAS', 'PLACAR'))
);

CREATE TABLE usuario_conquista(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
	id_conquista INT NOT NULL,
    data_conquista DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ctIdUsuario FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    CONSTRAINT ctIdConquista FOREIGN KEY (id_conquista) REFERENCES conquista(id)
);