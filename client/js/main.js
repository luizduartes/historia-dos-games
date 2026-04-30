import { changeToPage } from "./utils.js"
import { updateScroll } from "./scrollPage.js"

// Função para controlar o scroll horizontal da página
updateScroll()

// Redirecionando usuário para a tela de Login
loginButton.addEventListener('click', () => {
    changeToPage('./auth')
})
