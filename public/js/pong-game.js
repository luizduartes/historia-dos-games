const canvas = document.getElementById("pong-canvas")
const ctx = canvas.getContext("2d")

// Importando cores do CSS
const eRoot = document.documentElement
const styleRoot = getComputedStyle(eRoot)
const neonColor = styleRoot.getPropertyValue('--color-primary').trim()
// const darkColor = styleRoot.getPropertyValue('--accent-disabled').trim()

// Placar
let playerScore = 0
let cpuScore = 0
let matchSeconds = 0
let paused = false

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
const cpuVelocity = 5

// Propriedades da bola
let ballRadius = 8
let ballX = canvas.width / 2
let ballY = canvas.height / 2
let ballVelocityX = 4
let ballVelocityY = 4

function resetBall() {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballVelocityX = 0
    ballVelocityY = 0

    setTimeout(() => {
        ballVelocityX = (Math.random() > 0.5 ? 1 : -1) * 4
        ballVelocityY = (Math.random() > 0.5 ? 1 : -1) * 4
    }, 2000)
}

function draw() {
    // Limpando a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height)

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

        // Colisão da bola com a parede
        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            ballVelocityX *= -1
        }

        // Colisão da bola com o player
        if (ballY + ballRadius >= racketY && 
            ballX > racketX && 
            ballX < racketX + racketWidth) {
            ballVelocityY *= -1
            ballY = racketY - ballRadius // Push-out
        }

        // Colisão da bola com a Cpu
        if (ballY - ballRadius <= racketHeight && 
            ballX > racketCpuX && 
            ballX < racketCpuX + racketWidth) {
            ballVelocityY *= -1
            ballY = racketHeight + ballRadius // Push-out
        }

        // Resetando a bola
        if (ballY < 0 || ballY > canvas.height) {
            let scoredBy = ballY < 0 ? "player" : "cpu"
            resetBall()
            if (scoredBy == "player") playerGoal()
            if (scoredBy == "cpu") cpuGoal()
        }

        // Movimento da Cpu
        let cpuRacketCenterX = racketCpuX + (racketWidth / 2)
        let deadzone = 15 // Evita o tremor da CPU

        if (cpuRacketCenterX < ballX - deadzone) {
            racketCpuX += cpuVelocity
        } else if (cpuRacketCenterX > ballX + deadzone) {
            racketCpuX -= cpuVelocity
        }

        // Mantendo a Cpu dentro do canvas
        racketCpuX = Math.max(0, Math.min(canvas.width - racketWidth, racketCpuX))
    }

    draw()
    requestAnimationFrame(loop)
}

function playerGoal() {
    playerScore++
    playerScoreText.innerText = String(playerScore).padStart(2, "0")
}

function cpuGoal() {
    cpuScore++
    cpuScoreText.innerText = String(cpuScore).padStart(2, "0")
}

// Função para dar play no jogo
playButton.addEventListener('click', () => {
    playButton.style.display = "none"
    play()
})

function play() {
    // Começa o loop()
    loop()
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
    if (e.code == 'Escape') paused = !paused
})