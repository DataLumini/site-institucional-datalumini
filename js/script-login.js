let vetorLoginMocado = [
    {
        email: "bia@gmail.com",
        senha: "bia123"
    },
    {
        email: "gabriel@gmail.com",
        senha: "gabriel123"
    },
    {
        email: "ana@gmail.com",
        senha: "ana123"
    },
    {
        email: "guilherme@gmail.com",
        senha: "guilherme123"
    },
    {
        email: "livia@gmail.com",
        senha: "livia123"
    },
    {
        email: "kaue@gmail.com",
        senha: "kaue123"
    }
];

function entrar() {
    const ValorEmail = email.value;
    const ValorSenha = pass.value;

    if (ValorEmail.trim() == "" || ValorSenha.trim() == "") {
        erros.innerHTML = `<p>Por favor, preencha todos os campos.</p>`;
    } else if (ValorEmail.length < 5 || ValorSenha.length < 5) {
        erros.innerHTML = `<p>O email e a senha devem conter pelo menos 5 caracteres.</p>`;
    } else {
        let usuarioEncontrado = false;
        for (let i = 0; i < vetorLoginMocado.length; i++) {
            if (vetorLoginMocado[i].email == ValorEmail && vetorLoginMocado[i].senha == ValorSenha) {
                usuarioEncontrado = true;
            }
        }
        if (usuarioEncontrado) {
            window.location.href = "../dashboard.html";
        } else {
            erros.innerHTML = `<p>Email ou senha incorretos. Tente novamente.</p>`;
        }
    }
}

function mostrarSenha() {
    if (pass.type == "password") {
        pass.type = "text";
        password_icon.style.backgroundImage = "url('./img/olhoOn.svg')";
    } else {
        pass.type = "password";
        password_icon.style.backgroundImage = "url('./img/olhoOff.svg')";
    }
}

