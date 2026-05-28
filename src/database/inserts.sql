-- =========================================
-- USUÁRIOS
-- =========================================

INSERT INTO usuario (
    username,
    email,
    senha,
    vitorias,
    derrotas,
    win_streak_atual,
    melhor_win_streak
) VALUES

('zak', 'zak@email.com', '123456', 0, 0, 0, 0),

('pixelKing', 'pixel@email.com', '123456', 128, 37, 7, 18),

('retroPlayer', 'retro@email.com', '123456', 74, 21, 4, 11),

('arcadeMaster', 'arcade@email.com', '123456', 210, 56, 15, 32),

('pongHero', 'pong@email.com', '123456', 53, 44, 2, 6),

('cpuDestroyer', 'cpu@email.com', '123456', 310, 40, 24, 41);



-- =========================================
-- PARTIDAS
-- =========================================

INSERT INTO partida (
    id_usuario,
    pontuacao_player,
    pontuacao_cpu,
    duracao_segundos,
    resultado
) VALUES

-- pixelKing
(2, 5, 0, 65, 'VITORIA'),
(2, 5, 2, 98, 'VITORIA'),
(2, 3, 5, 120, 'DERROTA'),
(2, 5, 1, 75, 'VITORIA'),
(2, 5, 4, 220, 'VITORIA'),
(2, 0, 5, 45, 'DERROTA'),

-- retroPlayer
(3, 5, 3, 140, 'VITORIA'),
(3, 5, 4, 230, 'VITORIA'),
(3, 2, 5, 100, 'DERROTA'),

-- arcadeMaster
(4, 5, 0, 55, 'VITORIA'),
(4, 5, 1, 60, 'VITORIA'),
(4, 5, 2, 72, 'VITORIA'),
(4, 5, 3, 95, 'VITORIA'),
(4, 4, 5, 180, 'DERROTA'),

-- pongHero
(5, 5, 4, 300, 'VITORIA'),
(5, 5, 0, 88, 'VITORIA'),
(5, 1, 5, 66, 'DERROTA'),

-- cpuDestroyer
(6, 5, 0, 40, 'VITORIA'),
(6, 5, 1, 52, 'VITORIA'),
(6, 5, 2, 59, 'VITORIA'),
(6, 5, 0, 44, 'VITORIA'),
(6, 5, 3, 90, 'VITORIA');



-- =========================================
-- CONQUISTAS
-- =========================================

INSERT INTO conquista (
    nome,
    descricao,
    nome_icone
) VALUES

('Iniciante',
 'Vença 1 partida.',
 'medal'),

('Jogador Experiente',
 'Jogue 10 partidas.',
 'gamepad'),

('Veterano',
 'Jogue 50 partidas.',
 'trophy'),

('Primeira Sequência',
 'Alcance 3 vitórias seguidas.',
 'fire'),

('Imparável',
 'Alcance 10 vitórias seguidas.',
 'bolt'),

('Maratonista',
 'Faça uma partida durar mais de 400 segundos.',
 'stopwatch'),

('Velocista',
 'Vença uma partida em menos de 70 segundos.',
 'gauge-high'),

('Lenda do Pong',
 'Vença 100 partidas.',
 'crown'),

('Virada Histórica',
 'Vença uma partida após começar perdendo por 4 pontos.',
 'arrow-rotate-left'),

('Perfeccionista',
 'Vença uma partida sem deixar a CPU pontuar.',
 'shield'),

('Resistente',
 'Jogue por mais de 1 hora no total.',
 'clock'),

('Monstro do Pong',
 'Alcance 25 vitórias seguidas.',
 'skull');



-- =========================================
-- CONDIÇÕES DAS CONQUISTAS
-- =========================================

INSERT INTO conquista_condicao (
    tipo,
    operador,
    valor,
    id_conquista
) VALUES

-- Iniciante
('VITORIA', '>=', '1', 1),

-- Jogador Experiente
('PARTIDA', '>=', '10', 2),

-- Veterano
('PARTIDA', '>=', '50', 3),

-- Primeira Sequência
('WIN_STREAK', '>=', '3', 4),

-- Imparável
('WIN_STREAK', '>=', '10', 5),

-- Maratonista
('DURACAO', '>=', '400', 6),

-- Velocista
('DURACAO', '<=', '70', 7),
('VENCEU_PARTIDA', '==', '1', 7),

-- Lenda do Pong
('VITORIA', '>=', '100', 8),

-- Virada Histórica
('PONTOS_INICIAIS_CPU', '>=', '4', 9),
('VENCEU_PARTIDA', '==', '1', 9),

-- Perfeccionista
('PONTOS_CPU', '==', '0', 10),
('VENCEU_PARTIDA', '==', '1', 10),

-- Resistente
('TEMPO_JOGADO', '>=', '3600', 11),

-- Monstro do Pong
('WIN_STREAK', '>=', '25', 12);



-- =========================================
-- USUÁRIO_CONQUISTA
-- =========================================

INSERT INTO usuario_conquista (
    id_usuario,
    id_conquista
) VALUES

-- pixelKing
(2, 1),
(2, 2),
(2, 4),
(2, 7),

-- retroPlayer
(3, 1),
(3, 2),

-- arcadeMaster
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 7),
(4, 8),
(4, 10),

-- pongHero
(5, 1),
(5, 4),

-- cpuDestroyer
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 7),
(6, 8),
(6, 10),
(6, 11),
(6, 12);