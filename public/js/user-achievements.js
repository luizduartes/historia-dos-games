// -----------> CARROSSEL DAS CONQUISTAS DESBLOQUEADAS
const achievementsWrapperViewport = document.getElementById("achievementsWrapperViewport")
const achievementsWrapper = achievementsWrapperViewport.querySelector(".achievements-wrapper")
const achievementsCards = Array.from(achievementsWrapper.children)

const achievementNavigationDisplacement = achievementsWrapperViewport.scrollWidth / achievementsCards.length

achievementNavigationPreviousButton.addEventListener('click', () => {
    achievementsWrapperViewport.scrollLeft -= achievementNavigationDisplacement

    updateAchievementNavigationButtons(achievementsWrapperViewport.scrollLeft - achievementNavigationDisplacement)
})

achievementNavigationNextButton.addEventListener('click', () => {
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
const lockedAchievementsCards = Array.from(lockedAchievementsWrapper.children)

const lockedAchievementNavigationDisplacement = lockedAchievementsWrapperViewport.scrollWidth / lockedAchievementsCards.length

lockedAchievementNavigationPreviousButton.addEventListener('click', () => {
    lockedAchievementsWrapperViewport.scrollLeft -= lockedAchievementNavigationDisplacement

    updateLockedAchievementNavigationButtons(lockedAchievementsWrapperViewport.scrollLeft - lockedAchievementNavigationDisplacement)
})

lockedAchievementNavigationNextButton.addEventListener('click', () => {
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

renderAchievementsChart(14, 28)

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