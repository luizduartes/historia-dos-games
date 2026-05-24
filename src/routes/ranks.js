var express = require("express");
var router = express.Router();

var ranksController = require("../controllers/ranksController");

router.get("/vitoria", function (req, res) {
    ranksController.getVictoryRank(req, res)
})
router.get("/vitoria/:userId", function (req, res) {
    ranksController.getUserInVictoryRank(req, res)
})

router.get("/win-streak", function (req, res) {
    ranksController.getWinStreakRank(req, res)
})
router.get("/win-streak/:userId", function (req, res) {
    ranksController.getUserInWinStreakRank(req, res)
})

router.get("/vitoria-mais-rapida", function (req, res) {
    ranksController.getFastestVictoryRank(req, res)
})
router.get("/vitoria-mais-rapida/:userId", function (req, res) {
    ranksController.getUserInFastestVictoryRank(req, res)
})

router.get("/conquista", function (req, res) {
    ranksController.getAchievementRank(req, res)
})
router.get("/conquista/:userId", function (req, res) {
    ranksController.getUserInAchievementRank(req, res)
})

// router.get("/buscar/:id", function (req, res) {
//   ranksController.buscarPorId(req, res)
// })

// router.get("/listar", function (req, res) {
//   ranksController.listar(req, res)
// })

module.exports = router;