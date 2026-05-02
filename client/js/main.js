import { changeToPage } from "./utils.js"
import { updateScroll } from "./scrollPage.js"

const welcomeMessage = document.getElementById("welcomeMessage")
const userButtonMessage = document.getElementById("userButtonMessage")

// Função para controlar o scroll horizontal da página
updateScroll()

// Redirecionando usuário para a tela de Login
loginButton.addEventListener('click', () => {
    changeToPage('./auth')
})

function updateUsernameOnPage() {
    welcomeMessage.innerText = sessionStorage.NOME_USUARIO ? `BEM-VINDO, ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `BEM-VINDO, EXPLORADOR`
    userButtonMessage.innerText = sessionStorage.NOME_USUARIO ? `USUÁRIO: ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `USUÁRIO: CONVIDADO`
}

updateUsernameOnPage()
