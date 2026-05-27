var express = require("express");
var router = express.Router();

var achievementController = require("../controllers/achievementController");

router.get("/", function (req, res) {
    achievementController.conquistas(req, res)
})

module.exports = router;