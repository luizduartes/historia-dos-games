const database = require("../database/config")

function conquistas() {
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
            ON cc.id_conquista = c.id;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    conquistas
}