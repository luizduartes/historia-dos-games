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

function exibirMensagem(texto, cor = "#00F5FF") {
    const div = document.getElementById("div_mensagem");
    if (div) {
        div.style.color = cor;
        div.style.borderColor = cor;
        div.innerText = texto;
        div.style.opacity = 1;

        setTimeout(() => {
            div.style.opacity = 0;
        }, 6000);
    }
}

async function auth_login() {
    const emailVar = ipt_email.value;
    const senhaVar = ipt_senha.value;

    if (!emailVar || !senhaVar) {
        exibirMensagem("Preencha todos os campos!", "#FF00FF");
        return false;
    }

    // Validação de formato de e-mail com Regex
    if (!regras.email.test(emailVar)) {
        exibirMensagem("Formato de e-mail inválido!", "#FF00FF");
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

            exibirMensagem("Acesso concedido. Iniciando...", "#00F5FF");

            setTimeout(() => { window.location = "/client"; }, 2000);
        } else {
            exibirMensagem("Credenciais incorretas.", "#FF00FF");
        }
    } catch (erro) {
        exibirMensagem("Erro na rede. Tente mais tarde.", "#FF00FF");
    }

    return false;
}

async function auth_register() {
    const usernameVar = ipt_username.value;
    const emailVar = ipt_email.value;
    const senhaVar = ipt_senha.value;
    const confirmarSenhaVar = ipt_confirmar_senha.value;

    // 1. Verificação de campos vazios
    if (!usernameVar || !emailVar || !senhaVar || !confirmarSenhaVar) {
        exibirMensagem("Todos os campos são obrigatórios!", "#FF00FF");
        return false;
    }

    // 2. Validação do Username (Regex)
    if (!regras.username.test(usernameVar)) {
        exibirMensagem("Username: 3-15 caracteres (letras, números ou _)", "#FF00FF");
        return false;
    }

    // 3. Validação do Email (Regex)
    if (!regras.email.test(emailVar)) {
        exibirMensagem("Insira um e-mail válido!", "#FF00FF");
        return false;
    }

    // 4. Validação da Senha (Regex)
    if (!regras.senha.test(senhaVar)) {
        exibirMensagem("Senha: Mín. 8 caracteres, com letra, número e símbolo (@$!%*?&)", "#FF00FF");
        return false;
    }

    // 5. Confirmação de Senha
    if (senhaVar !== confirmarSenhaVar) {
        exibirMensagem("As senhas não coincidem!", "#FF00FF");
        return false;
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
            exibirMensagem("Usuário cadastrado com sucesso!", "#00F5FF");
            setTimeout(() => { changeToPage('./index.html') }, 2000);
        } else {
            throw new Error();
        }
    } catch (erro) {
        exibirMensagem("Erro ao cadastrar. Username ou e-mail já existem?", "#FF00FF");
    }

    return false;
}
