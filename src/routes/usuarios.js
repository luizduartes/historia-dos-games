const express = require("express")
const router = express.Router()

const usuarioController = require("../controllers/usuarioController")

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res)
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res)
})

router.post("/partida", function (req, res) {
    usuarioController.addMatch(req, res)
})

router.get("/perfil/:userId", function (req, res) {
    usuarioController.searchProfile(req, res)
})

router.get("/:userId/conquistas", function (req, res) {
    usuarioController.getAchievements(req, res)
})

router.get("/:userId/conquistas-bloqueadas", function (req, res) {
    usuarioController.getLockAchievements(req, res)
})

router.post("/:userId/conquistas", function (req, res) {
    usuarioController.winAchievement(req, res)
})

module.exports = router