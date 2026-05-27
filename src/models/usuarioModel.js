const database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    let instrucaoSql = `
        SELECT id, username, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function cadastrar(username, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", username, email, senha)
    
    let instrucaoSql = `
        INSERT INTO usuario (username, email, senha) VALUES ('${username}', '${email}', '${senha}');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

async function addMatch(id, playerScore, cpuScore, matchSeconds, matchResult) {
    console.log("Iniciando registro de partida...")
    let sqlInsertPartida = `
        INSERT INTO partida (id_usuario, pontuacao_player, pontuacao_cpu, duracao_segundos, resultado) VALUES
        ('${id}', '${playerScore}', '${cpuScore}', '${matchSeconds}', '${matchResult}');
    `

    console.log("Executando INSERT da partida...")
    await database.executar(sqlInsertPartida)

    let sqlUpdateUsuario = ""

    if (matchResult == "VITORIA") {
        sqlUpdateUsuario = `    
            UPDATE usuario SET
                vitorias = vitorias + 1,
                win_streak_atual = win_streak_atual + 1,
                melhor_win_streak = IF(win_streak_atual > melhor_win_streak, win_streak_atual, melhor_win_streak)
            WHERE id = ${id};
        `
    } else if (matchResult == "DERROTA") {
        sqlUpdateUsuario = `
            UPDATE usuario SET
                derrotas = derrotas + 1,
                win_streak_atual = 0
            WHERE id = ${id};
        `
    }

    if (sqlUpdateUsuario) {
        console.log("Executando UPDATE do usuário...")
        return database.executar(sqlUpdateUsuario)
    }
}

// Funções para a tela de perfil
function getUserInfos(userId) {
    let instrucaoSql = `
        SELECT * FROM vw_user_infos WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserOverview(userId) {
    let instrucaoSql = `
        SELECT * FROM vw_user_overview WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserRecentPerformance(userId) {
    let instrucaoSql = `
        SELECT * FROM vw_user_recent_performance
        WHERE id_usuario = ${userId}
        LIMIT 20;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserResultsDistribution(userId) {
    let instrucaoSql = `
        SELECT vitorias + derrotas AS partidas, vitorias, derrotas FROM usuario
        WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserLatestAchievements(userId) {
    let instrucaoSql = `
        SELECT * FROM vw_user_latest_achievements
        WHERE id_usuario = ${userId}
        LIMIT 3;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getAchievements(userId) {
    let instrucaoSql = `
        SELECT
            c.id,
            uc.data_conquista,
            c.nome,
            c.descricao,
            c.nome_icone
        FROM usuario_conquista uc
        JOIN conquista c
            ON uc.id_conquista = c.id
        WHERE uc.id_usuario = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getLockAchievements(userId) {
    let instrucaoSql = `
        SELECT
            c.id,
            c.nome,
            c.descricao,
            c.nome_icone,
            cc.tipo AS tipo_condicao,
            cc.operador AS operador_condicao,
            cc.valor AS valor_condicao
        FROM conquista c
        JOIN conquista_condicao cc
            ON cc.id_conquista = c.id
        WHERE c.id NOT IN (
            SELECT
                c.id
            FROM usuario_conquista uc
            RIGHT JOIN conquista c
                ON uc.id_conquista = c.id
            WHERE uc.id_usuario = ${userId}
        );
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function winAchievement(userId, achievementId) {
    let instrucaoSql = `
        INSERT INTO usuario_conquista (id_usuario, id_conquista) VALUES (${userId}, ${achievementId});
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    addMatch,
    getUserInfos,
    getUserOverview,
    getUserRecentPerformance,
    getUserResultsDistribution,
    getUserLatestAchievements,
    getAchievements,
    getLockAchievements,
    winAchievement
}