import { changeToPage } from "./utils.js";
import { checkAchievementsConditions } from "./pong-achievements.js";

// Redireciona o usuário caso não esteja logado
if (!sessionStorage.ID_USUARIO) {
    changeToPage('../auth/login.html')
}

const canvas = document.getElementById("pong-canvas")
const ctx = canvas.getContext("2d")

// Importando cores do CSS
const eRoot = document.documentElement
const styleRoot = getComputedStyle(eRoot)
const neonColor = styleRoot.getPropertyValue('--color-primary').trim()

// Objeto para ser mandado ao salvar partida para verificar novas conquistas desbloqueadas
let achievementsCheckData = {
    "VITORIA": 0,
    "WIN_STREAK": 0,
    "DURACAO": 0,
    "PARTIDA": 0,
    "VENCEU_PARTIDA": 0,
    "TEMPO_JOGADO": 0,
    "PONTOS_INICIAIS_CPU": 0,
    "PONTOS_INICIAIS_PLAYER": 0,
    "PONTOS_CPU": 0,
    "PONTOS_PLAYER": 0
}

// Placar
let playerScore = 0
let cpuScore = 0
let matchSeconds = 0
let paused = false
let isPlaying = false
let timerInterval

// Propriedades da Raquete do Player
let racketWidth = 100
let racketHeight = 20
let racketX = canvas.width / 2 - racketWidth / 2
let racketY = canvas.height - racketHeight
let playerRacketLeft = 0
let playerRacketRight = 0
const playerVelocity = 7

// Propriedades da Raquete da Cpu
let racketCpuX = canvas.width / 2 - racketWidth / 2
let racketCpuY = 0
const cpuMaxDeadzone = 25
const cpuMinDeadzone = 15
let cpuDeadzone = 10
const cpuMinVelocity = 3
const cpuMaxVelocity = 7
let cpuVelocity = 1

// Propriedades da bola
const ballRadius = 8
let ballX = canvas.width / 2
let ballY = canvas.height / 2
const ballMaxVelocity = 6
let ballVelocityX = 0
let ballVelocityY = ballMaxVelocity
const accelerationBallColision = 1.05
const initialVelocityY = 4

let animationId

// Função para normalizar um valor de um range para um novo range
function normalizeValue(value, currentMin, currentMax, minRange, maxRange) {
  // Normaliza o valor para a escala de 0 a 1
  const normalizedValue = (value - currentMin) / (currentMax - currentMin)
  
  // Aplica o valor na nova escala desejada
  return normalizedValue * (maxRange - minRange) + minRange
}

function resetBall() {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballVelocityX = 0
    ballVelocityY = 0

    setTimeout(() => {
        ballVelocityX = Math.random() * 2
        ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * initialVelocityY
    }, 2000)
}

function drawClear() {
    // Limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw() {
    // Limpando a tela
    drawClear()

    // Cor de preenchimento
    ctx.fillStyle = neonColor
    
    // Raquete do player
    ctx.fillRect(racketX, racketY, racketWidth, racketHeight)
    
    // Raquete da Cpu
    ctx.fillRect(racketCpuX, racketCpuY, racketWidth, racketHeight)
    
    // Bola
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}

function loop() {
    if (!paused) {
        // Movimentação do player
        racketX += (playerRacketLeft + playerRacketRight) * playerVelocity
        racketX = Math.max(0, Math.min(canvas.width - racketWidth, racketX))

        // Física da bola
        ballX += ballVelocityX
        ballY += ballVelocityY

        // Colisões da bola com a parede
        if (ballX + ballRadius > canvas.width && ballVelocityX > 0) { // Parede da Direita
            ballVelocityX *= -1
        }
        if (ballX - ballRadius < 0 && ballVelocityX < 0) { // Parede da Esquerda
            ballVelocityX *= -1
        }

        // Colisão da bola com o player
        if
        (
            ballY + ballRadius >= racketY &&
            ballX > racketX &&
            ballX < racketX + racketWidth
        )
        {
            ballVelocityY *= -(accelerationBallColision)
            ballVelocityX = normalizeValue(ballX, racketX, racketX + racketWidth, -1, 1) * ballMaxVelocity
            ballY = racketY - ballRadius
        }

        // Colisão da bola com a Cpu
        if
        (
            ballY - ballRadius <= racketHeight &&
            ballX > racketCpuX &&
            ballX < racketCpuX + racketWidth
        )
        {
            ballVelocityY *= -(accelerationBallColision)
            ballVelocityX += normalizeValue(ballX, racketCpuX, racketCpuX + racketWidth, -1, 1) * ballMaxVelocity
            ballY = racketHeight + ballRadius
        }

        // Resetando a bola
        if (ballY < 0 || ballY > canvas.height) {
            let scoredBy = ballY < 0 ? "player" : "cpu"
            resetBall()
            if (scoredBy == "player") {
                // Interrompe função se tiver acabado a partida
                if (playerGoal()) return
            }
            if (scoredBy == "cpu") {
                // Interrompe função se tiver acabado a partida
                if (cpuGoal()) return
            }
        }

        // Variando a velocidade da Cpu
        if (Math.random() > 0.9) {
            cpuVelocity = normalizeValue(Math.random(), 0, 1, cpuMinVelocity, cpuMaxVelocity)
            cpuDeadzone = Math.floor(Math.random() * (cpuMaxDeadzone - cpuMinDeadzone + 1)) + cpuMinDeadzone
        }

        // Movimento da Cpu
        let cpuRacketCenterX = racketCpuX + (racketWidth / 2)

        if (cpuRacketCenterX < ballX - cpuDeadzone) {
            racketCpuX += cpuVelocity
        } else if (cpuRacketCenterX > ballX + cpuDeadzone) {
            racketCpuX -= cpuVelocity
        }

        // Mantendo a Cpu dentro do canvas
        racketCpuX = Math.max(0, Math.min(canvas.width - racketWidth, racketCpuX))
    }

    draw()
    animationId = requestAnimationFrame(loop)
}

function playerGoal() {
    playerScore++
    if (cpuScore <= 0) {
        achievementsCheckData["PONTOS_INICIAIS_PLAYER"] ++
    }
    playerScoreText.innerText = String(playerScore).padStart(2, "0")

    if (playerScore >= 5) {
        gameover()
        return true
    }
    return false
}

function cpuGoal() {
    cpuScore++
    if (playerScore <= 0) {
        achievementsCheckData["PONTOS_INICIAIS_CPU"] ++
    }
    cpuScoreText.innerText = String(cpuScore).padStart(2, "0")

    if (cpuScore >= 5) {
        gameover()
        return true
    }
    return false
}

// Limpando variáveis para recomeçar o jogo
function cleanVariables() {
    // Dados verificados nas conquistas
    achievementsCheckData = {
        "VITORIA": 0,
        "WIN_STREAK": 0,
        "DURACAO": 0,
        "PARTIDA": 0,
        "VENCEU_PARTIDA": 0,
        "TEMPO_JOGADO": 0,
        "PONTOS_INICIAIS_CPU": 0,
        "PONTOS_INICIAIS_PLAYER": 0,
        "PONTOS_CPU": 0,
        "PONTOS_PLAYER": 0
    }

    // Estados
    paused = false
    isPlaying = false

    // Tempo
    clearInterval(timerInterval)
    matchSeconds = 0
    timeText.innerText = String(matchSeconds).padStart(3, "0")

    // Placar
    playerScore = 0
    cpuScore = 0

    playerScoreText.innerText = "00"
    cpuScoreText.innerText = "00"

    // Movimento do player
    playerRacketLeft = 0
    playerRacketRight = 0

    // Raquete player
    racketX = canvas.width / 2 - racketWidth / 2
    racketY = canvas.height - racketHeight

    // Raquete cpu
    racketCpuX = canvas.width / 2 - racketWidth / 2
    racketCpuY = 0

    cpuVelocity = cpuMinVelocity
    cpuDeadzone = cpuMinDeadzone

    // Bola
    resetBall()

    // Telas
    pauseScreen.style.display = "none"
    victoryScreen.style.display = "none"
    defeatScreen.style.display = "none"
    titleScreen.style.display = "none"

    // Render inicial
    draw()
}

function gameover() {
    if (playerScore == cpuScore) {
        console.error("Jogo finalizou com um empate!")
        return
    }

    drawClear()
    cancelAnimationFrame(animationId)
    clearInterval(timerInterval)
    let winner = playerScore > cpuScore ? "player" : "cpu"

    if (winner == "player") {
        victoryScreen.style.display = 'flex'
    } else {
        defeatScreen.style.display = 'flex'
    }

    isPlaying = false
    playButton.classList.remove('disabled-button')
    saveMatch()
}

// Função para dar play no jogo
playButton.addEventListener('click', () => {
    if (isPlaying) return
    titleScreen.style.display = "none"
    victoryScreen.style.display = "none"
    defeatScreen.style.display = "none"
    play()
})

function playMatchTimer() {
    timerInterval = setInterval(() => {
       matchSeconds++
       timeText.innerText = String(matchSeconds).padStart(3, "0")
    }, 1000)
}

function play() {
    cleanVariables()

    // Começa o loop()
    loop()

    playMatchTimer()

    isPlaying = true
    playButton.classList.add('disabled-button')
}

// Inputs
addEventListener('keydown', (e) => {
    if (e.code == 'KeyD' || e.code == 'ArrowRight') playerRacketRight = 1
    if (e.code == 'KeyA' || e.code == 'ArrowLeft') playerRacketLeft = -1
})

addEventListener('keyup', (e) => {
    if (e.code == 'KeyD' || e.code == 'ArrowRight') playerRacketRight = 0
    if (e.code == 'KeyA' || e.code == 'ArrowLeft') playerRacketLeft = 0
})

addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && isPlaying) {
        paused = !paused
        
        if (paused) {
            pauseScreen.style.display = 'flex'
            clearInterval(timerInterval)
            return
        }
        pauseScreen.style.display = 'none'
        playMatchTimer()
    }

})

// Cadastrar a partida no banco de dados
async function saveMatch() {
    const idVar = String(sessionStorage.ID_USUARIO)
    const playerScoreVar = String(playerScore)
    const cpuScoreVar = String(cpuScore)
    const matchSecondsVar = String(matchSeconds)
    const matchResultVar = playerScore > cpuScore ? 'VITORIA' : 'DERROTA'
    
    if (!idVar || !playerScoreVar || !cpuScoreVar || !matchSecondsVar || !matchResultVar) {
        showErrorMessage("ERRO DE VALIDAÇÃO", "TODOS OS CAMPOS SÃO OBRIGATÓRIOS")
        return false;
    }
    
    try {
        const resposta = await fetch("/usuarios/partida", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idServer: idVar,
                playerScoreServer: playerScoreVar,
                cpuScoreServer: cpuScoreVar,
                matchSecondsServer: matchSecondsVar,
                matchResultServer: matchResultVar,
            }),
        });

        if (resposta.ok) {
            console.log("Partida cadastrada com sucesso!")
        } else {
            throw new Error();
        }
    } catch (erro) {
        console.error("Erro ao cadastrar partida!")
    }

    const usuarioStatsResponse = await fetch(`/usuarios/perfil/${idVar}`)
    const usuarioStatsData = await usuarioStatsResponse.json()

    achievementsCheckData["PARTIDA"] = usuarioStatsData.resumo.partidas
    achievementsCheckData["VITORIA"] = usuarioStatsData.resumo.vitorias
    achievementsCheckData["WIN_STREAK"] = usuarioStatsData.resumo.melhor_win_streak
    achievementsCheckData["TEMPO_JOGADO"] = Number(usuarioStatsData.resumo.segundos_jogados)

    achievementsCheckData["VENCEU_PARTIDA"] = playerScore > cpuScore ? 1 : 0
    achievementsCheckData["DURACAO"] = matchSeconds
    achievementsCheckData["PONTOS_PLAYER"] = playerScore
    achievementsCheckData["PONTOS_CPU"] = cpuScore

    console.log(achievementsCheckData)
    checkAchievementsConditions(achievementsCheckData)

    return false;
}