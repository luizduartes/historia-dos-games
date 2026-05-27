-- =============================================
-- INSERTS DE CONQUISTAS
-- =============================================

INSERT INTO conquista (nome, descricao, nome_icone) VALUES
('Iniciante', 'Vença 1 partida.', 'medal'),
('Jogador Experiente', 'Jogue 10 partidas.', 'gamepad'),
('Veterano', 'Jogue 50 partidas.', 'trophy'),
('Primeira Sequência', 'Alcance 3 vitórias seguidas.', 'fire'),
('Imparável', 'Alcance 10 vitórias seguidas.', 'bolt'),
('Maratonista', 'Faça uma partida durar mais de 400 segundos.', 'stopwatch'),
('Velocista', 'Vença uma partida em menos de 70 segundos.', 'gauge-high'),
('Lenda do Pong', 'Vença 100 partidas.', 'crown'),
('Virada Histórica', 'Vença uma partida após começar perdendo por 4 pontos.', 'arrow-rotate-left'),
('Perfeccionista', 'Vença uma partida sem deixar a CPU pontuar.', 'shield');


-- =============================================
-- CONDIÇÕES DAS CONQUISTAS
-- =============================================

-- Iniciante
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('VITORIA', '>=', '1', 1);

-- Jogador Experiente
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('PARTIDA', '>=', '10', 2);

-- Veterano
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('PARTIDA', '>=', '50', 3);

-- Primeira Sequência
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('WIN_STREAK', '>=', '3', 4);

-- Imparável
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('WIN_STREAK', '>=', '10', 5);

-- Maratonista
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('DURACAO', '>', '400', 6);

-- Velocista
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('DURACAO', '<=', '70', 7),
('VITORIA', '>=', '1', 7);

-- Lenda do Pong
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('VITORIA', '>=', '100', 8);

-- Virada Histórica
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('PONTOS_INICIAIS_CPU', '>=', '4', 9),
('VITORIA', '>=', '1', 9);

-- Perfeccionista
INSERT INTO conquista_condicao (tipo, operador, valor, id_conquista) VALUES
('PONTOS_CPU', '==', '0', 10),
('VITORIA', '>=', '1', 10);


-- =============================================
-- USUÁRIOS EXEMPLO
-- =============================================

INSERT INTO usuario (
    username,
    email,
    senha,
    vitorias,
    derrotas,
    win_streak_atual,
    melhor_win_streak
) VALUES
('pixelKing', 'pixelking@email.com', '123456', 128, 37, 7, 18),
('retroPlayer', 'retro@email.com', '123456', 74, 29, 3, 11),
('arcadeMaster', 'arcade@email.com', '123456', 210, 55, 15, 25),
('pongHero', 'pong@email.com', '123456', 32, 12, 1, 5),
('newbieGame', 'newbie@email.com', '123456', 0, 0, 0, 0);


-- =============================================
-- PARTIDAS EXEMPLO
-- =============================================

INSERT INTO partida (
    id_usuario,
    pontuacao_player,
    pontuacao_cpu,
    duracao_segundos,
    resultado
) VALUES

-- pixelKing
(1, 5, 0, 65, 'VITORIA'),
(1, 5, 2, 98, 'VITORIA'),
(1, 3, 5, 120, 'DERROTA'),
(1, 5, 1, 75, 'VITORIA'),

-- retroPlayer
(2, 5, 4, 180, 'VITORIA'),
(2, 1, 5, 95, 'DERROTA'),
(2, 5, 3, 130, 'VITORIA'),

-- arcadeMaster
(3, 5, 0, 58, 'VITORIA'),
(3, 5, 1, 62, 'VITORIA'),
(3, 5, 2, 70, 'VITORIA'),
(3, 2, 5, 110, 'DERROTA'),

-- pongHero
(4, 5, 4, 410, 'VITORIA'),
(4, 0, 5, 80, 'DERROTA');


-- =============================================
-- CONQUISTAS DESBLOQUEADAS
-- =============================================

INSERT INTO usuario_conquista (
    id_usuario,
    id_conquista
) VALUES

-- pixelKing
(1, 1),
(1, 2),
(1, 4),
(1, 7),

-- retroPlayer
(2, 1),
(2, 2),

-- arcadeMaster
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 7),
(3, 8),
(3, 10),

-- pongHero
(4, 1),
(4, 6),
(4, 9);