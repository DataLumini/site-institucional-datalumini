let vetorUsuariosMocado = [
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

function entrar(ValorEmail, ValorSenha) {
    if (ValorEmail.trim() == "" || ValorSenha.trim() == "") {
        erros.innerHTML = `<p>Por favor, preencha todos os campos.</p>`;
    } else if (ValorEmail.length < 5 || ValorSenha.length < 5) {
        erros.innerHTML = `<p>O email e a senha devem conter pelo menos 5 caracteres.</p>`;
    } else {
        let usuarioEncontrado = false;
        for (let i = 0; i < vetorUsuariosMocado.length; i++) {
            if (vetorUsuariosMocado[i].email == ValorEmail && vetorUsuariosMocado[i].senha == ValorSenha) {
                usuarioEncontrado = true;
            }
        }
        if (usuarioEncontrado) {
            window.location.href = "../dashboardEstufa.html";
        } else {
            erros.innerHTML = `<p>Email ou senha incorretos. Tente novamente.</p>`;
            console.log(vetorUsuariosMocado)
        }
    }
}

function cadastrar(ValorEmail, ValorSenha, Valorsenha2, ValorNome, Valorcpf) {

    if (ValorEmail.trim() == "" || ValorSenha.trim() == "" || ValorNome.trim() == "" || Valorcpf.trim() == "" || Valorsenha2.trim() == "") {
        erros.innerHTML = `<p>Por favor, preencha todos os campos.</p>`;
        return

    }
    else if (!ValorEmail.includes("@")) {
        erros.innerHTML = `<p>erro no email</p>`
        return
    }
    else if (ValorEmail.length < 5 || ValorSenha.length < 5) {
        erros.innerHTML = `<p>O email e a senha devem conter pelo menos 5 caracteres.</p>`;
        return

    }
    else if (Valorcpf.length < 11 || Valorcpf.length > 11) {
        erros.innerHTML = `<p>O seu CPF deve ter 11 numeros.</p>`;
        return
    }
    else if (Valorsenha2 != ValorSenha) {
        erros.innerHTML = `<p>Senhas diferentes, tente novamente.</p>`
        return
    }
    else {
        for (let i = 0; i < vetorUsuariosMocado.length; i++) {
            if (vetorUsuariosMocado[i].email == ValorEmail) {
                usuarioEncontrado = true;
                erros.innerHTML = `Você não pode criar uma conta com esse email, já existe`
                return
            }
        }
    }


    let usuarioCadastrar = { email: ValorEmail, senha: ValorSenha };
    vetorUsuariosMocado.push(usuarioCadastrar);
    window.location.href = "../TelaLogin.html";

}
