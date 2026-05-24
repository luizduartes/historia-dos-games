var ranksModel = require("../models/ranksModel")

function getVictoryRank(req, res) {
  ranksModel.getVictoryRank().then((resultado) => {
    res.status(200).json(resultado)
  })
}

function getWinStreakRank(req, res) {
  ranksModel.getWinStreakRank().then((resultado) => {
    res.status(200).json(resultado)
  })
}

function getFastestVictoryRank(req, res) {
  ranksModel.getFastestVictoryRank().then((resultado) => {
    res.status(200).json(resultado)
  })
}

function getAchievementRank(req, res) {
  ranksModel.getAchievementRank().then((resultado) => {
    res.status(200).json(resultado)
  })
}

// =========================================================

function getUserInVictoryRank(req, res) {
    let userId = req.params.userId

    ranksModel.getUserInVictoryRank(userId)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).send("Usuário não encontrado no rank!")
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar o usuário no rank: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function getUserInWinStreakRank(req, res) {
    let userId = req.params.userId

    ranksModel.getUserInWinStreakRank(userId)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).send("Usuário não encontrado no rank!")
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar o usuário no rank: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function getUserInFastestVictoryRank(req, res) {
    let userId = req.params.userId

    ranksModel.getUserInFastestVictoryRank(userId)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).send("Usuário não encontrado no rank!")
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar o usuário no rank: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
}

function getUserInAchievementRank(req, res) {
    let userId = req.params.userId

    ranksModel.getUserInAchievementRank(userId)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado)
                } else {
                    res.status(204).send("Usuário não encontrado no rank!")
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "Houve um erro ao buscar o usuário no rank: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
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
};