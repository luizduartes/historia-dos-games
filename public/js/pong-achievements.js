// Função para chegar as conquistas que o usuário desbloqueou naquela partida
async function checkAchievementsConditions(checkData) {
    const userId = sessionStorage.ID_USUARIO
    const lockAchievements = await getLockAchievements()

    for (let i = 0; i < lockAchievements.length; i++) {
        const achievement = lockAchievements[i]
        let unlock_achievement = false
        
        for (let j = 0; j < achievement.condicoes.length; j++) {
            const condition = achievement.condicoes[j]

            // 'VITORIA', 'WIN_STREAK', 'DURACAO', 'PARTIDA', 'TEMPO_JOGADO',
            // 'PONTOS_INICIAIS_CPU', 'PONTOS_INICIAIS_PLAYER', 'PONTOS_CPU', 'PONTOS_PLAYER'
            const tipo = condition.tipo

            // '>', '>=', '<', '<=', '=='
            const operador = condition.operador

            // Valores Numéricos
            const valor = condition.valor
            
            // Operações inversas para ele interromper o ganho da conquista
            if (operador == '>=' && checkData[tipo] < valor) {
                unlock_achievement = false
                break
            }
            else if (operador == '<=' && checkData[tipo] > valor) {
                unlock_achievement = false
                break
            }
            else if (operador == '==' && checkData[tipo] != valor) {
                unlock_achievement = false
                break
            }

            unlock_achievement = true
        }

        if (unlock_achievement) {
            winAchievement(userId, achievement)
        }
    }
}

async function getLockAchievements() {
    let lockAchievements = []

    const userId = sessionStorage.ID_USUARIO
    const lockAchievementsResponse = await fetch(`/usuarios/${userId}/conquistas-bloqueadas`)
    const lockAchievementsData = await lockAchievementsResponse.json()

    for(let i = 0; i < lockAchievementsData.length; i++) {
        const achievement = lockAchievementsData[i]

        if (lockAchievements.length > 0 && lockAchievements[lockAchievements.length - 1].id == achievement.id) {
            lockAchievements[lockAchievements.length - 1].condicoes.push({
                tipo: achievement.tipo_condicao,
                operador: achievement.operador_condicao,
                valor: achievement.valor_condicao
            })
        } else {
            lockAchievements.push({
                id: achievement.id,
                nome: achievement.nome,
                descricao: achievement.descricao,
                nome_icone: achievement.nome_icone,
                condicoes: [
                    {
                        tipo: achievement.tipo_condicao,
                        operador: achievement.operador_condicao,
                        valor: achievement.valor_condicao
                    }
                ]
            })
        }
    }

    return lockAchievements
}

const notificationDuration = 8000
const notificationDelay = 500
let notificationQueue = Promise.resolve() // Cria uma fila vazia para as notificações

function notificationAchievement(icon_name, title, description) {
    let wrapper = document.getElementById("notifications-wrapper")
    if (!wrapper) {
        wrapper = document.createElement("div")
        wrapper.id = "notifications-wrapper"
        document.body.appendChild(wrapper)
    }

    const notificationElement = document.createElement("div")
    notificationElement.classList = "notification"
    notificationElement.innerHTML = `
        <div class="notification-content">
            <div class="notification-left-content">
                <div class="notification-icon-container">
                    <i class="fa-solid fa-${icon_name}"></i>
                </div>
                <div class="notification-text-container">
                    <span class="notification-unlock-text">CONQUISTA DESBLOQUEADA!</span>
                    <span class="notification-title-text">${title.toUpperCase()}</span>
                    <span class="notification-description-text">${description}</span>
                </div>
            </div>
            <div class="notification-right-content">
                <span>NOVO!</span>
            </div>
        </div>
    `

    wrapper.appendChild(notificationElement)

    requestAnimationFrame(() => {
        notificationElement.classList.add("notification--show")
    })
    setTimeout(() => {
        notificationElement.classList.remove("notification--show")
        
        notificationElement.addEventListener("transitionend", () => {
            if (wrapper.contains(notificationElement)) {
                notificationElement.remove()
            }
            
            if (wrapper.children.length === 0) {
                wrapper.remove()
            }
        })
    }, notificationDuration)
}

async function winAchievement(userId, achievement) {
    const achievementId = achievement.id
    const iconName = achievement.nome_icone
    const title = achievement.nome
    const description = achievement.descricao

    try {
        const resposta = await fetch(`/usuarios/${userId}/conquistas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userIdServer: userId,
                achievementIdServer: achievementId
            }),
        })

        if (resposta.ok) {
            // notificationAchievement(iconName, title, description)
            notificationQueue = notificationQueue.then(async () => {
                await notificationAchievement(iconName, title, description)
                await new Promise(r => setTimeout(r, notificationDelay))
            })
            console.log("Conquista ganha salva no banco de dados!")
        } else {
            throw new Error()
        }
    } catch (erro) {
        console.error(erro)
    }
}

export { checkAchievementsConditions }