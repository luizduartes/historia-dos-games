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