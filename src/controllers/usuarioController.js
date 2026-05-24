const usuarioModel = require("../models/usuarioModel");

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

module.exports = {
    autenticar,
    cadastrar,
    addMatch
}