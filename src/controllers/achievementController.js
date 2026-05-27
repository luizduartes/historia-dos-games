var achievementModel = require("../models/achievementModel")

function conquistas(req, res) {
  achievementModel.conquistas().then((resultado) => {
    res.status(200).json(resultado)
  })
}

module.exports = {
    conquistas
}