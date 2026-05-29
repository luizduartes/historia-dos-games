import { changeToPage, formatSeconds } from "./utils.js";

searchProfile()

function searchProfile() {
    if (!sessionStorage.ID_USUARIO) {
        console.log("Usuário não logado!")
        changeToPage("../profile.html")
        return
    }

    fetch(`/usuarios/perfil/${sessionStorage.ID_USUARIO}`)
        .then(res => res.json())
        .then(renderProfile)
        .catch(console.error)
}

function renderProfile(data) {
    // =========================
    // USUÁRIO
    // =========================
    userId.innerHTML = `<span>ID: #${data.usuario.id}</span>`

    userUsername.innerText =
        data.usuario.username

    userAchievementsCount.innerText =
        `${data.usuario.qtd_conquista}/${data.usuario.conquista_total}`

    userCreatedAt.innerText =
        data.usuario.criado_em


    // =========================
    // VISÃO GERAL
    // =========================
    overviewVictories.innerText =
        data.resumo.vitorias

    overviewDefeats.innerText =
        data.resumo.derrotas

    overviewCurrentStreak.innerText =
        data.resumo.win_streak_atual

    overviewBestStreak.innerText =
        data.resumo.melhor_win_streak

    overviewMatches.innerText =
        data.resumo.partidas

    overviewPlayTime.innerText =
        formatSeconds(Number(data.resumo.segundos_jogados))


    // =========================
    // RANKINGS
    // =========================
    rankAchievementPosition.innerText =
        `#${data.rankings.conquista.posicao}`

    rankVictoryPosition.innerText =
        `#${data.rankings.vitoria.posicao}`

    rankWinStreakPosition.innerText =
        `#${data.rankings.win_streak.posicao}`

    rankFastVictoryPosition.innerText =
        `#${data.rankings.vitoria_mais_rapida.posicao}`


    // =========================
    // DISTRIBUIÇÃO
    // =========================
    const dist =
        data.graficos.distribuicao_resultados

    const total = dist.partidas
    const victories = dist.vitorias
    const defeats = dist.derrotas

    const victoryPercent =
        total > 0
            ? ((victories / total) * 100).toFixed(1)
            : 0

    const defeatPercent =
        total > 0
            ? ((defeats / total) * 100).toFixed(1)
            : 0

    resultsDistributionTotal.innerText =
        total

    resultsVictoryInfo.innerText =
        `${victoryPercent}% (${victories})`

    resultsDefeatInfo.innerText =
        `${defeatPercent}% (${defeats})`


    // =========================
    // CONQUISTAS RECENTES
    // =========================
    latestAchievements.innerHTML = ""

    data.ultimasConquistas.forEach(conquista => {
        latestAchievements.innerHTML += `
            <div class="achievements-card">
                <i class="fa-solid fa-${conquista.nome_icone} achievements-card-icon"></i>

                <div class="achievements-card-text">
                    <span class="achievements-card-text-title">
                        ${conquista.nome.toUpperCase()}
                    </span>

                    <span class="achievements-card-text-description">
                        ${conquista.descricao}
                    </span>
                </div>
            </div>
        `
    })


    // =========================
    // CHARTS
    // =========================
    renderRecentPerformanceChart(
        data.graficos.desempenho_recente
    )

    renderResultsDistributionChart(
        victories,
        defeats
    )
}

const ctx_RecentPerformance = document.getElementById("chartRecentPerformance");
const ctx_chartResultsDistribution = document.getElementById("chartResultsDistribution");

const eRoot = document.documentElement
const styleRoot = getComputedStyle(eRoot)
const neonColor = styleRoot.getPropertyValue('--color-primary').trim()
const darkColor = styleRoot.getPropertyValue('--accent-disabled').trim()

Chart.defaults.color = neonColor
Chart.defaults.font.family = 'IBMPlexMono'

let recentPerformanceChart = null
let resultsDistributionChart = null

// ======================================
// PERFORMANCE RECENTE
// ======================================
function renderRecentPerformanceChart(matches) {

    if (recentPerformanceChart) {
        recentPerformanceChart.destroy()
    }

    const labels =
        matches.map((_, i) => i + 1).reverse()

    const values =
        matches.map(match =>
            match.pontuacao_player
        ).reverse()

    const colors =
        matches.map(match =>
            match.resultado === "VITORIA"
                ? neonColor
                : darkColor
        ).reverse()

    recentPerformanceChart = new Chart(
        ctx_RecentPerformance,
        {
            type: "bar",

            data: {
                labels,

                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderColor: neonColor,
                    borderWidth: 1
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    x: {
                        display: false
                    },

                    y: {
                        max: 5,

                        grid: {
                            color: "rgba(92,242,44,0.25)",
                            borderDash: [5, 5]
                        },

                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        }
    )
}


// ======================================
// DISTRIBUIÇÃO RESULTADOS
// ======================================
function renderResultsDistributionChart(victories,defeats) {
    if (resultsDistributionChart) {
        resultsDistributionChart.destroy()
    }

    resultsDistributionChart =
        new Chart(
            ctx_chartResultsDistribution,
            {
                type: "doughnut",

                data: {
                    labels: [
                        "VITÓRIAS",
                        "DERROTAS"
                    ],

                    datasets: [{
                        data: [
                            victories,
                            defeats
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