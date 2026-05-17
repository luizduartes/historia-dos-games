const ctx_RecentPerformance = document.getElementById("chartRecentPerformance");
const ctx_chartResultsDistribution = document.getElementById("chartResultsDistribution");

const eRoot = document.documentElement
const styleRoot = getComputedStyle(eRoot)
const neonColor = styleRoot.getPropertyValue('--color-primary').trim()
const darkColor = styleRoot.getPropertyValue('--accent-disabled').trim()

Chart.defaults.color = neonColor
Chart.defaults.font.family = 'IBMPlexMono'

// 1. Gráfico de Performance Recente
new Chart(ctx_RecentPerformance, {
    type: 'bar',
    data: {
        labels: Array.from({length: 20}, (_, i) => i + 1), // Gera números de 1 a 20
        datasets: [{
            data: [2, 3, 5, 2, 4, 3, 5, 1, 3, 5, 2, 4, 3, 5, 5, 1, 2, 5, 4, 2],
            backgroundColor: ctx => ctx.raw === 5 ? neonColor : darkColor,
            borderColor: neonColor,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }, // Remove legenda padrão
        scales: {
            x: { display: false }, // Oculta o eixo X inferior
            y: { 
                max: 5, 
                grid: { color: 'rgba(92, 242, 44, 0.3)', borderDash: [5, 5] }, // Linha tracejada
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
})

// 2. Gráfico de Distribuição de Resultados
new Chart(ctx_chartResultsDistribution, {
    type: 'doughnut',
    data: {
        labels: ['VITÓRIAS', 'DERROTAS'],
        datasets: [{
            data: [128, 37],
            backgroundColor: [neonColor, darkColor],
            borderColor: neonColor,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%', // Deixa o buraco da rosca mais largo
        plugins: { legend: { display: false } }
    }
})
