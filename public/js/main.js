import { changeToPage } from "./utils.js"
import { previousSection, nextSection, updateScroll, updateBottomBar } from "./scrollPage.js"

const welcomeMessage = document.getElementById("welcomeMessage")
const userButtonMessage = document.getElementById("userButtonMessage")

// Atualizar o conteúdo da Bottom Bar
updateBottomBar()

// Função para controlar o scroll horizontal da página
updateScroll()

// Redirecionando para a tela de Login ou para a tela de Perfil do Usuário
loginButton.addEventListener('click', () => {
    if (sessionStorage.ID_USUARIO) {
        changeToPage('./user/profile.html')
    } else {
        changeToPage('./auth/login.html')
    }
})

logoutButton.addEventListener('click', () => {
    sessionStorage.clear()
    location.reload()
})

function updateUsernameOnPage() {
    welcomeMessage.innerText = sessionStorage.NOME_USUARIO ? `BEM-VINDO, ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `BEM-VINDO, EXPLORADOR`
    userButtonMessage.innerText = sessionStorage.NOME_USUARIO ? `USUÁRIO: ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `USUÁRIO: CONVIDADO`

    if (sessionStorage.NOME_USUARIO) {
        logoutButton.style.display = "flex"
    } else {
        logoutButton.style.display = "none"
    }
}

// Função de click para os botões de mudar de seção
const previousSectionButton = document.getElementById("previous-section-button")
const nextSectionButton = document.getElementById("next-section-button")

previousSectionButton.addEventListener('click', previousSection)
nextSectionButton.addEventListener('click', nextSection)

updateUsernameOnPage()
