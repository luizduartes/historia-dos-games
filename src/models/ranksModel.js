const database = require("../database/config")

function getVictoryRank() {
    let instrucaoSql = `
        SELECT * FROM rank_vitoria LIMIT 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getWinStreakRank() {
    let instrucaoSql = `
        SELECT * FROM rank_win_streak LIMIT 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getFastestVictoryRank() {
    let instrucaoSql = `
        SELECT * FROM rank_vitoria_mais_rapida LIMIT 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getAchievementRank() {
    let instrucaoSql = `
        SELECT * FROM rank_conquista LIMIT 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

// FUNÇÕES PARA PEGAR A POSIÇÃO DO PLAYER NOS RANKS

function getUserInVictoryRank(userId) {
    let instrucaoSql = `
        SELECT * FROM rank_vitoria WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserInWinStreakRank(userId) {
    let instrucaoSql = `
        SELECT * FROM rank_win_streak WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserInFastestVictoryRank(userId) {
    let instrucaoSql = `
        SELECT * FROM rank_vitoria_mais_rapida WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function getUserInAchievementRank(userId) {
    let instrucaoSql = `
        SELECT * FROM rank_conquista WHERE id = ${userId};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    getVictoryRank,
    getWinStreakRank,
    getFastestVictoryRank,
    getAchievementRank,
    
    getUserInVictoryRank,
    getUserInWinStreakRank,
    getUserInFastestVictoryRank,
    getUserInAchievementRank
}