INSERT INTO usuario (username, email, senha) VALUES 
('PlayerUm', 'player1@email.com', 'senha123'),
('RetroGamer', 'retro@email.com', 'admin70'),
('DevMaster', 'dev@email.com', 'root00');

INSERT INTO conquista (nome, descricao, requisito) VALUES 
('Historiador', 'Chegou ao final do scroll da história.', 'scroll_completo'),
('Mestre do Pong', 'Venceu a CPU por mais de 5 pontos de diferença.', 'vitoria_esmagadora'),
('Veterano', 'Realizou mais de 10 partidas no simulador.', '10_partidas');

INSERT INTO partida (id_usuario, pontuacao_player, pontuacao_cpu, duracao_segundos) VALUES 
(1, 5, 2, 45), -- Vitória do PlayerUm
(1, 1, 5, 30), -- Derrota do PlayerUm
(2, 5, 0, 25), -- Vitória esmagadora do RetroGamer
(3, 3, 5, 80); -- Derrota do DevMaster

INSERT INTO usuario_conquista (id_usuario, id_conquista) VALUES 
(1, 1), -- PlayerUm leu a história
(2, 1), -- RetroGamer leu a história
(2, 2); -- RetroGamer ganhou a conquista de mestre

SELECT u.username, p.pontuacao_player 
FROM usuario u 
JOIN partida p ON u.id = p.id_usuario 
ORDER BY p.pontuacao_player DESC;

SELECT u.username, COUNT(uc.id_conquista) as total_conquistas
FROM usuario u
LEFT JOIN usuario_conquista uc ON u.id = uc.id_usuario
GROUP BY u.id;