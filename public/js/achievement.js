function winAchievement(userId, achievementId) {
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

export { winAchievement }