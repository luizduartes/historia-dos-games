import { changeToPage } from "./utils.js"
import { previousSection, nextSection, updateScroll, updateBottomBar } from "./scrollPage.js"

const welcomeMessage = document.getElementById("welcomeMessage")
const userButtonMessage = document.getElementById("userButtonMessage")

// Atualizar o conteúdo da Bottom Bar
updateBottomBar()

// Função para controlar o scroll horizontal da página
updateScroll()

// Redirecionando usuário para a tela de Login
loginButton.addEventListener('click', () => {
    changeToPage('./auth/login.html')
})

function updateUsernameOnPage() {
    welcomeMessage.innerText = sessionStorage.NOME_USUARIO ? `BEM-VINDO, ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `BEM-VINDO, EXPLORADOR`
    userButtonMessage.innerText = sessionStorage.NOME_USUARIO ? `USUÁRIO: ${String(sessionStorage.NOME_USUARIO).toUpperCase()}` : `USUÁRIO: CONVIDADO`
}

// Função de click para os botões de mudar de seção
const previousSectionButton = document.getElementById("previous-section-button")
const nextSectionButton = document.getElementById("next-section-button")

previousSectionButton.addEventListener('click', previousSection)
nextSectionButton.addEventListener('click', nextSection)

updateUsernameOnPage()
