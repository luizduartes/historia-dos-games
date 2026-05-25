// RANK TYPES: 'vitoria', 'win-streak', 'vitoria-mais-rapida', 'conquista'
async function listRank(rankType) {
    let rankHtml = ""
    let playerRankHtml = ""
    // ranksPositionsGrid.innerHTML = ""

    let rankData = await fetch(`/ranks/${rankType}`)

    if (rankData.ok) {
        const rankJson = await rankData.json()
        
        for (let i = 0; i < rankJson.length; i++) {
            const player = rankJson[i]
            rankHtml += `
                <span>${player.posicao}.</span>
                <span>${player.username}</span>
                <span class="rank-score">${player.pontuacao}</span>
            `
        }
    }

    if (sessionStorage.ID_USUARIO) {
        let rankUserData = await fetch(`/ranks/${rankType}/${sessionStorage.ID_USUARIO}`)
        
        if (rankUserData.ok) {
            const rankJson = await rankUserData.json()
            
            if (rankJson.length > 0) {
                playerRankHtml = `
                    <span>${rankJson[0].posicao}.</span>
                    <span>${rankJson[0].username} (EU)</span>
                    <span class="rank-score">${rankJson[0].pontuacao}</span>
                `
            } else {
                console.error("Erro ao encontrar usuário no rank!")
            }
        }
    }
    
    
    ranksPositionsGrid.innerHTML = rankHtml

    if (playerRankHtml.length > 0) {
        ranksUserPositionGrid.innerHTML = playerRankHtml
    }
}


const ranksButtons = [rankVictoryButton, rankWinStreakButton, rankFastestVictoryButton, rankAchievementButton]
const ranksNames = ["vitoria", "win-streak", "vitoria-mais-rapida", "conquista"]
listRank(ranksNames[0])
let rankActive = ranksNames[0]

rankVictoryButton.addEventListener('click', () => {
    let rankName = ranksNames[0]
    rankTypeLabel.innerText = "VITÓRIAS"

    if (rankActive != rankName) {
        listRank(rankName)
        rankActive = rankName

        for (let i = 0; i < ranksButtons.length; i++) {
            const btn = ranksButtons[i]

            btn.classList.remove("rank-selector-button-active")
            if (i != 0) continue
            btn.classList.add("rank-selector-button-active")
        }
    }
})

rankWinStreakButton.addEventListener('click', () => {
    let rankName = ranksNames[1]
    rankTypeLabel.innerText = "MELHOR SEQUÊNCIA DE VITÓRIAS"

    if (rankActive != rankName) {
        listRank(rankName)
        rankActive = rankName

        for (let i = 0; i < ranksButtons.length; i++) {
            const btn = ranksButtons[i]

            btn.classList.remove("rank-selector-button-active")
            if (i != 1) continue
            btn.classList.add("rank-selector-button-active")
        }
    }
})

rankFastestVictoryButton.addEventListener('click', () => {
    let rankName = ranksNames[2]
    rankTypeLabel.innerText = "VITÓRIA MAIS RÁPIDA"

    if (rankActive != rankName) {
        listRank(rankName)
        rankActive = rankName

        for (let i = 0; i < ranksButtons.length; i++) {
            const btn = ranksButtons[i]

            btn.classList.remove("rank-selector-button-active")
            if (i != 2) continue
            btn.classList.add("rank-selector-button-active")
        }
    }
})

rankAchievementButton.addEventListener('click', () => {
    let rankName = ranksNames[3]
    rankTypeLabel.innerText = "CONQUISTAS"

    if (rankActive != rankName) {
        listRank(rankName)
        rankActive = rankName

        for (let i = 0; i < ranksButtons.length; i++) {
            const btn = ranksButtons[i]

            btn.classList.remove("rank-selector-button-active")
            if (i != 3) continue
            btn.classList.add("rank-selector-button-active")
        }
    }
})