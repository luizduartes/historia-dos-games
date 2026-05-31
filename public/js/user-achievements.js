updateAchievements()

async function updateAchievements() {
    let achievementsTotalCount = 0

    const totalAchievementsData = await fetch(`/conquistas`)
    if (totalAchievementsData.ok) {
        const totalAchievementsResponse = await totalAchievementsData.json()
        achievementsTotalCount = totalAchievementsResponse.length

        let previousAchievementId = -1
        for (let i = 0; i < totalAchievementsResponse.length; i++) {
            const achievement = totalAchievementsResponse[i]

            if (previousAchievementId != achievement.id) {
                achievementsTotalCount++
                achievementsTotalCount = achievement.id
            }
        }
    }

    const userId = sessionStorage.ID_USUARIO
    
    let unlockAchievementsHtml = ""
    let unlockedAchievementsCount = 0

    const userUnlockedAchievementsData = await fetch(`/usuarios/${userId}/conquistas`)
    if (userUnlockedAchievementsData.ok) {
        const userUnlockedAchievementsResponse = await userUnlockedAchievementsData.json()
        unlockedAchievementsCount = userUnlockedAchievementsResponse.length

        for (let i = 0; i < userUnlockedAchievementsResponse.length; i++) {
            const achievement = userUnlockedAchievementsResponse[i]
            
            unlockAchievementsHtml += `
                <div class="achievement-card">
                    <div class="achievement-card-top">
                        <i class="fa-solid fa-${achievement.nome_icone}"></i>
                        <span class="achievement-card-title">${(achievement.nome).toUpperCase()}</span>
                        <span class="achievement-card-description">${achievement.descricao}</span>
                    </div>
                    <div class="achievement-card-bottom">
                        <span>DESBLOQUEADA</span>
                        <span>${achievement.data_conquista}</span>
                    </div>
                </div>
            `
        }
    }

    if (unlockAchievementsHtml == "") {
        unlockedAchievementsContainerMainContent.style.display = "none"
        noUnlockedAchievementsMessage.style.display = "flex"
    } else {
        unlockedAchievementsContainerMainContent.style.display = "flex"
        unlockedAchievementsWrapper.innerHTML = unlockAchievementsHtml
    }
    
    
    let lockAchievementsHtml = ""
    const userLockedAchievementsData = await fetch(`/usuarios/${userId}/conquistas-bloqueadas`)
    if (userLockedAchievementsData.ok) {
        const userLockedAchievementsResponse = await userLockedAchievementsData.json()

        for (let i = 0; i < userLockedAchievementsResponse.length; i++) {
            lockAchievementsHtml += `
                <div class="achievement-card locked-achievement-card">
                    <div class="achievement-card-top">
                        <i class="fa-solid fa-lock"></i>
                        <span class="achievement-card-title">?????</span>
                        <span class="achievement-card-description">Continue jogando para descobrir.</span>
                    </div>
                    <div class="achievement-card-bottom">
                        <span>BLOQUEADA</span>
                    </div>
                </div>
            `
        }
    }

    if (lockAchievementsHtml == "") {
        lockedAchievementsContainerMainContent.style.display = "none"
        noLockedAchievementsMessage.style.display = "flex"
    } else {
        lockedAchievementsContainerMainContent.style.display = "flex"
        lockedAchievementsWrapper.innerHTML = lockAchievementsHtml
    }


    // ATUALIZANDO OUTROS CAMPOS DA PÁGINA
    userUsernameText.innerText = sessionStorage.NOME_USUARIO
    userIdText.innerText = `ID: #${sessionStorage.ID_USUARIO}`

    userAchievementsCount.innerText = `${unlockedAchievementsCount}/${achievementsTotalCount}`
    userAchievementsPercent.innerText = `${(unlockedAchievementsCount / achievementsTotalCount * 100).toFixed(0)}%`

    unlockedAchievementsCountText.innerText = `(${unlockedAchievementsCount}/${achievementsTotalCount})`
    lockedAchievementsCountText.innerText = `(${achievementsTotalCount - unlockedAchievementsCount}/${achievementsTotalCount})`

    renderAchievementsChart(unlockedAchievementsCount, achievementsTotalCount)
    resultsAchievementsPercent.innerText = `${(unlockedAchievementsCount / achievementsTotalCount * 100).toFixed(0)}%`
}












// -----------> CARROSSEL DAS CONQUISTAS DESBLOQUEADAS
const achievementsWrapperViewport = document.getElementById("achievementsWrapperViewport")
const achievementsWrapper = achievementsWrapperViewport.querySelector(".achievements-wrapper")

achievementNavigationPreviousButton.addEventListener('click', () => {
    const achievementsCards = Array.from(achievementsWrapper.children)
    const achievementNavigationDisplacement = achievementsWrapperViewport.scrollWidth / achievementsCards.length

    achievementsWrapperViewport.scrollLeft -= achievementNavigationDisplacement
    updateAchievementNavigationButtons(achievementsWrapperViewport.scrollLeft - achievementNavigationDisplacement)
})

achievementNavigationNextButton.addEventListener('click', () => {
    const achievementsCards = Array.from(achievementsWrapper.children)
    const achievementNavigationDisplacement = achievementsWrapperViewport.scrollWidth / achievementsCards.length

    achievementsWrapperViewport.scrollLeft += achievementNavigationDisplacement
    updateAchievementNavigationButtons(achievementsWrapperViewport.scrollLeft + achievementNavigationDisplacement)
})


function updateAchievementNavigationButtons(newScrollPos) {
    if (newScrollPos <= 0) {
        achievementNavigationPreviousButton.classList.add("achievement-navigation-button--disabled")
    } else {
        achievementNavigationPreviousButton.classList.remove("achievement-navigation-button--disabled")
    }

    if (newScrollPos + achievementsWrapperViewport.clientWidth >= achievementsWrapperViewport.scrollWidth) {
        achievementNavigationNextButton.classList.add("achievement-navigation-button--disabled")
    } else {
        achievementNavigationNextButton.classList.remove("achievement-navigation-button--disabled")
    }
}

// -----------> CARROSSEL DAS CONQUISTAS BLOQUEADAS
const lockedAchievementsWrapperViewport = document.getElementById("lockedAchievementsWrapperViewport")
const lockedAchievementsWrapper = lockedAchievementsWrapperViewport.querySelector(".achievements-wrapper")

lockedAchievementNavigationPreviousButton.addEventListener('click', () => {
    const lockedAchievementsCards = Array.from(lockedAchievementsWrapper.children)
    const lockedAchievementNavigationDisplacement = lockedAchievementsWrapperViewport.scrollWidth / lockedAchievementsCards.length

    lockedAchievementsWrapperViewport.scrollLeft -= lockedAchievementNavigationDisplacement
    updateLockedAchievementNavigationButtons(lockedAchievementsWrapperViewport.scrollLeft - lockedAchievementNavigationDisplacement)
})

lockedAchievementNavigationNextButton.addEventListener('click', () => {
    const lockedAchievementsCards = Array.from(lockedAchievementsWrapper.children)
    const lockedAchievementNavigationDisplacement = lockedAchievementsWrapperViewport.scrollWidth / lockedAchievementsCards.length

    lockedAchievementsWrapperViewport.scrollLeft += lockedAchievementNavigationDisplacement
    updateLockedAchievementNavigationButtons(lockedAchievementsWrapperViewport.scrollLeft + lockedAchievementNavigationDisplacement)
})


function updateLockedAchievementNavigationButtons(newScrollPos) {
    if (newScrollPos <= 0) {
        lockedAchievementNavigationPreviousButton.classList.add("achievement-navigation-button--disabled")
    } else {
        lockedAchievementNavigationPreviousButton.classList.remove("achievement-navigation-button--disabled")
    }
    
    if (newScrollPos + lockedAchievementsWrapperViewport.clientWidth >= lockedAchievementsWrapperViewport.scrollWidth) {
        lockedAchievementNavigationNextButton.classList.add("achievement-navigation-button--disabled")
    } else {
        lockedAchievementNavigationNextButton.classList.remove("achievement-navigation-button--disabled")
    }
}

// -----------> CHART DA PORCENTAGEM DE CONQUISTAS DESBLOQUEADAS
const ctx_chartAchievements = document.getElementById("chartAchievementsPercent")
let achievementsChart = null

const eRoot = document.documentElement
const styleRoot = getComputedStyle(eRoot)
const neonColor = styleRoot.getPropertyValue('--color-primary').trim()
const darkColor = styleRoot.getPropertyValue('--accent-disabled').trim()

// A fórmula para calcular a porcentagem de um número é multiplicar o valor total pela porcentagem (dividida por 100)
function renderAchievementsChart(userAchievementsCount, totalAchievementsCount) {
    if (achievementsChart) {
        achievementsChart.destroy()
    }

    achievementsChart =
        new Chart(
            ctx_chartAchievements,
            {
                type: "doughnut",

                data: {
                    labels: [
                        "DESBLOQUEADAS",
                        "BLOQUEADAS"
                    ],

                    datasets: [{
                        data: [
                            userAchievementsCount,
                            totalAchievementsCount - userAchievementsCount
                        ],

                        backgroundColor: [
                            neonColor,
                            darkColor
                        ],

                        borderColor:
                            neonColor,

                        borderWidth: 1
                    }]
                },

                options: {
                    responsive: true,

                    maintainAspectRatio:
                        false,

                    cutout: "60%",

                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        )
}