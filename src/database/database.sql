CREATE DATABASE histgames;
USE histgames;

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

-- =============================================
-- CRIAÇÃO DAS VIEWS
-- =============================================

-- ID | NOME | CONQUISTAS(ATUAIS E TOTAIS) | DATA DE CADASTRO
CREATE VIEW user_infos AS
SELECT
	u.id,
    u.username,
    COUNT(uc.id_usuario) AS qtd_conquista,
    (SELECT COUNT(*) FROM conquista) AS conquista_total,
    DATE_FORMAT(u.criado_em, '%d/%m/%Y') AS criado_em
FROM usuario u
LEFT JOIN usuario_conquista uc
	ON uc.id_usuario = u.id
LEFT JOIN conquista c
	ON uc.id_conquista = c.id
GROUP BY u.id;

-- ============================================================

-- ID | VITÓRIAS TOTAIS | DERROTAS TOTAIS | WIN STREAK ATUAL | MELHOR WIN STREAK | PARTIDAS JOGADAS | TEMPO TOTAL JOGADO
CREATE VIEW user_overview AS
SELECT
	u.id,
	u.vitorias,
    u.derrotas,
    u.win_streak_atual,
    u.melhor_win_streak,
    SUM(p.duracao_segundos) AS segundos_jogados
FROM usuario u
JOIN partida p
	ON p.id_usuario = u.id
GROUP BY u.id;

-- ============================================================

-- DESEMPENHO RECENTE (ÚLTIMAS 20 PARTIDAS)
CREATE VIEW user_recent_performance AS
SELECT * FROM partida
ORDER BY data_partida DESC;

-- CONSULTA NO BACKEND:
-- SELECT * FROM user_recent_performance
-- WHERE id_usuario = ?
-- LIMIT 20;

-- ============================================================

-- ÚLTIMAS CONQUISTAS
CREATE VIEW user_latest_achievements AS
SELECT
	uc.id_usuario,
	c.nome,
    c.descricao,
    uc.data_conquista
FROM usuario_conquista uc
JOIN conquista c
	ON uc.id_conquista = c.id
ORDER BY data_conquista DESC;

-- CONSULTA NO BACKEND:
-- SELECT * FROM user_latest_achievements
-- WHERE id_usuario = ?
-- LIMIT 3;

-- ============================================================

-- --> RANKS

-- VITÓRIAS TOTAIS
CREATE VIEW rank_vitoria AS
SELECT username, vitorias FROM usuario
ORDER BY vitorias DESC
LIMIT 10;

-- VITÓRIAS EM SEQUÊNCIA
CREATE VIEW rank_win_streak AS
SELECT username, melhor_win_streak FROM usuario
ORDER BY melhor_win_streak DESC
LIMIT 10;

-- VITÓRIAS MAIS RÁPIDAS
CREATE VIEW rank_vitoria_mais_rapida AS
SELECT u.username, MIN(p.duracao_segundos) AS melhor_duracao FROM partida p
JOIN usuario u
	ON p.id_usuario = u.id
WHERE p.resultado = 'VITORIA'
GROUP BY u.id
ORDER BY melhor_duracao ASC
LIMIT 10;


-- MAIS CONQUISTAS
CREATE VIEW rank_conquista AS
SELECT
    u.username,
    COUNT(uc.id_usuario) AS qtd_conquista
FROM usuario u
JOIN usuario_conquista uc
	ON uc.id_usuario = u.id
JOIN conquista c
	ON uc.id_conquista = c.id
GROUP BY u.id
ORDER BY qtd_conquista DESC
LIMIT 10;