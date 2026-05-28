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
            winAchievement(userId, achievement.id)
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

async function winAchievement(userId, achievementId) {
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
            console.log("Conquista ganha salva no banco de dados!")
        } else {
            throw new Error()
        }
    } catch (erro) {
        console.error(erro)
    }
}

export { checkAchievementsConditions }