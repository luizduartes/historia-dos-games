import { changeToPage } from "./utils.js";
const criarContaBtn = document.getElementById("criarContaBtn")
const voltarLoginBtn = document.getElementById("voltarLoginBtn")
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

if (criarContaBtn) {
    criarContaBtn.addEventListener('click', () => {
        changeToPage('./register.html')
    })
}

if (voltarLoginBtn) {
    voltarLoginBtn.addEventListener('click', () => {
        changeToPage('./index.html')
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        auth_login()
    })
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        auth_register()
    })
}


// Configuração das Expressões Regulares (Regex)
const regras = {
    // Email: padrão básico (texto@texto.dominio)
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Username: Alfanumérico e underscores, de 3 a 15 caracteres (estilo gamer tag)
    username: /^[a-zA-Z0-9_]{3,15}$/,
    
    // Senha: Mínimo 8 caracteres, pelo menos uma letra, um número e um caractere especial
    senha: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/
};

// const errorInputMessages = {
//     email: "E-mail: digite um e-mail válido (ex: nome@email.com)",
//     username: "Username: use de 3 a 15 caracteres (letras, números ou '_')",
//     senha: "Senha: use de 8 a 30 caracteres, com letra, número e símbolo"
// }

function connectInputFieldWarning(field) {
    const form = document.querySelector("form")
    const inputField = document.getElementById(`ipt_${field}`)
    const inputFieldWarning = document.getElementById(`input-field-warning-${field}`)

    if (form && inputField && inputFieldWarning) {
        inputFieldWarning.style.opacity = 1
        
        form.addEventListener('input', () => {
            let inputValue = inputField.value

            if (field == "confirmar_senha") {
                console.log(inputField)
                console.log(inputValue)
                let senhaValue = document.getElementById("ipt_senha").value
                console.log(senhaValue)

                if (inputValue == senhaValue) {
                    inputFieldWarning.style.opacity = 0
                }
                else {
                    inputFieldWarning.style.opacity = 1
                }
            }
            else {
                if (regras[field].test(inputValue)) {
                    inputFieldWarning.style.opacity = 0
                }
                else {
                    inputFieldWarning.style.opacity = 1
                }
            }

        })
    }
}

function showErrorMessage(title, message) {
    const div = document.getElementById("modal-warning-box-error")
    const divTitle = document.getElementById("modal-warning-box-error-title")
    const divMessage = document.getElementById("modal-warning-box-error-message")
    const divButton = document.getElementById("warning-box-button-error")

    if (div) {
        div.style.display = 'block'
        divTitle.innerHTML = title
        divMessage.innerHTML = message

        divButton.addEventListener('click', () => {
            div.style.display = 'none'
        })
    }
}

function showAcceptMessage(title, message) {
    const div = document.getElementById("modal-warning-box-accept")
    const divTitle = document.getElementById("modal-warning-box-accept-title")
    const divMessage = document.getElementById("modal-warning-box-accept-message")
    const divButton = document.getElementById("warning-box-button")

    if (div) {
        div.style.display = 'block'
        divTitle.innerHTML = title
        divMessage.innerHTML = message
    }
}

async function auth_login() {
    const emailVar = ipt_email.value;
    const senhaVar = ipt_senha.value;

    if (!emailVar || !senhaVar) {
        showErrorMessage("ERRO DE AUTENTICAÇÃO", "PREENCHA TODOS OS CAMPOS PARA REALIZAR A AUTENTICAÇÃO")
        return false;
    }

    // Validação de formato de e-mail com Regex
    if (!regras.email.test(emailVar)) {
        connectInputFieldWarning("email")
        showErrorMessage("ERRO DE AUTENTICAÇÃO", "ALGUNS CAMPOS CONTÊM ERROS.<br>POR FAVOR, VERIFIQUE E TENTE NOVAMENTE.")
        return false;
    }

    try {
        const resposta = await fetch("http://localhost:3333/usuarios/autenticar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar,
            }),
        });

        if (resposta.ok) {
            const json = await resposta.json();
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.username;
            sessionStorage.ID_USUARIO = json.id;

            showAcceptMessage("ACESSO CONCEDIDO", "USUÁRIO LOGADO COM SUCESSO!<br>ENTRANDO NO SISTEMA...")

            setTimeout(() => { window.location = "/client"; }, 3000);
        } else {
            showErrorMessage("ERRO DE AUTENTICAÇÃO", "USUÁRIO OU SENHA INCORRETO(S).<br>VERIFIQUE OS DADOS INFORMADOS E TENTE NOVAMENTE")
        }
    } catch (erro) {
        showErrorMessage("ERRO DE AUTENTICAÇÃO", "ERRO NA REDE.<br>TENTE NOVAMENTE MAIS TARDE")
    }

    return false;
}

async function auth_register() {
    const usernameVar = ipt_username.value;
    const emailVar = ipt_email.value;
    const senhaVar = ipt_senha.value;
    const confirmarSenhaVar = ipt_confirmar_senha.value;

    if (!usernameVar || !emailVar || !senhaVar || !confirmarSenhaVar) {
        showErrorMessage("ERRO DE VALIDAÇÃO", "TODOS OS CAMPOS SÃO OBRIGATÓRIOS")
        return false;
    }

    if (!regras.username.test(usernameVar) || !regras.email.test(emailVar) || !regras.senha.test(senhaVar) || senhaVar !== confirmarSenhaVar) {
        showErrorMessage("ERRO DE VALIDAÇÃO", "ALGUNS CAMPOS CONTÊM ERROS.<br>POR FAVOR, VERIFIQUE E TENTE NOVAMENTE.")

        if (!regras.username.test(usernameVar)) {
            connectInputFieldWarning("username")
        }
        if (!regras.email.test(emailVar)) {
            connectInputFieldWarning("email")
        }
        if (!regras.senha.test(senhaVar)) {
            connectInputFieldWarning("senha")
        }
        if (senhaVar !== confirmarSenhaVar) {
            connectInputFieldWarning("confirmar_senha")
        }

        return false
    }

    try {
        const resposta = await fetch("http://localhost:3333/usuarios/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usernameServer: usernameVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
            }),
        });

        if (resposta.ok) {
            showAcceptMessage("CADASTRO REALIZADO", "USUÁRIO CADASTRADO COM SUCESSO!<br>REDIRECIONANDO PARA LOGIN...")
            setTimeout(() => { changeToPage('./index.html') }, 2000);
        } else {
            throw new Error();
        }
    } catch (erro) {
        showErrorMessage("ERRO DE VALIDAÇÃO", "USERNAME OU E-MAIL JÁ EXISTEM?")
    }

    return false;
}
