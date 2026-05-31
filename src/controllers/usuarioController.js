const usuarioModel = require("../models/usuarioModel")
const ranksModel = require("../models/ranksModel");
const { json } = require("express");

function autenticar(req, res) {
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            username: resultadoAutenticar[0].username,
                        })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    let username = req.body.usernameServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;

    if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(username, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function addMatch(req, res) {
    let id = req.body.idServer
    let playerScore = req.body.playerScoreServer
    let cpuScore = req.body.cpuScoreServer
    let matchSeconds = req.body.matchSecondsServer
    let matchResult = req.body.matchResultServer

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!")
    } else if (playerScore == undefined) {
        res.status(400).send("Seu playerScore está undefined!")
    } else if (cpuScore == undefined) {
        res.status(400).send("Sua cpuScore está undefined!")
    } else if (matchSeconds == undefined) {
        res.status(400).send("Sua matchSeconds está undefined!")
    } else if (matchResult == undefined) {
        res.status(400).send("Sua matchResult está undefined!")
    } else {
        usuarioModel.addMatch(id, playerScore, cpuScore, matchSeconds, matchResult)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log("\nHouve um erro ao adicionar partida! Erro: ", erro.sqlMessage)
                    res.status(500).json(erro.sqlMessage)
                }
            );
    }
}

function getAchievements(req, res) {
    const userId = req.params.userId

    if (!userId) {
        return res.status(400).send("userId undefined!")
    }

    usuarioModel.getAchievements(userId)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar conquistas do usuário: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function getLockAchievements(req, res) {
    const userId = req.params.userId

    if (!userId) {
        return res.status(400).send("userId undefined!")
    }

    usuarioModel.getLockAchievements(userId)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar conquistas bloqueadas do usuário: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function winAchievement(req, res) {
    let userId = req.body.userIdServer
    let achievementId = req.body.achievementIdServer

    if (userId == undefined) {
        res.status(400).send("Seu userId está undefined!")
    } else if (achievementId == undefined) {
        res.status(400).send("Seu achievementId está undefined!")
    } else {
        usuarioModel.winAchievement(userId, achievementId)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log("\nHouve um erro ao usuário salvar conquista ganha! Erro: ", erro.sqlMessage)
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
}

async function searchProfile(req, res) {
    const userId = req.params.userId

    if (!userId) {
        return res.status(400).send("userId undefined!")
    }

    try {
        const [
            usuario,
            resumo,
            rankVitoria,
            rankWinStreak,
            rankVitoriaRapida,
            rankConquista,
            desempenhoRecente,
            distribuicaoResultados,
            ultimasConquistas
        ] = await Promise.all([
            usuarioModel.getUserInfos(userId),
            usuarioModel.getUserOverview(userId),

            ranksModel.getUserInVictoryRank(userId),
            ranksModel.getUserInWinStreakRank(userId),
            ranksModel.getUserInFastestVictoryRank(userId),
            ranksModel.getUserInAchievementRank(userId),

            usuarioModel.getUserRecentPerformance(userId),
            usuarioModel.getUserResultsDistribution(userId),
            usuarioModel.getUserLatestAchievements(userId)
        ])

        if (usuario.length == 0) {
            return res.status(404).send("Usuário não encontrado")
        }

        const resultado_final = {
            usuario: usuario[0],

            resumo: resumo[0] || {},

            rankings: {
                vitoria: rankVitoria[0] || {},
                win_streak: rankWinStreak[0] || {},
                vitoria_mais_rapida: rankVitoriaRapida[0] || {},
                conquista: rankConquista[0] || {}
            },

            graficos: {
                desempenho_recente: desempenhoRecente,
                distribuicao_resultados: distribuicaoResultados[0] || {}
            },

            ultimasConquistas
        }

        res.status(200).json(resultado_final)

    } catch (erro) {
        console.log(erro)

        res.status(500).json({
            erro: erro.sqlMessage || erro.message
        })
    }
}

module.exports = {
    autenticar,
    cadastrar,
    addMatch,
    searchProfile,
    getAchievements,
    getLockAchievements,
    winAchievement
}