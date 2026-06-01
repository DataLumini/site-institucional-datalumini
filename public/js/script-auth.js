function cadastrar(valorNome, valorEmail, valorCpf, valorEmpresa, valorSenha, valorSenha2) {

    if (valorEmail.trim() == "" || valorSenha.trim() == "" || valorNome.trim() == "" || valorCpf.trim() == "" || valorSenha2.trim() == "") {
        erros.innerHTML = `<p>Por favor, preencha todos os campos.</p>`;
        return

    }
    else if (!valorEmail.includes("@")) {
        erros.innerHTML = `<p>erro no email</p>`
        return
    }
    else if (valorSenha.length < 5) {
        erros.innerHTML = `<p>A senha deve conter pelo menos 5 caracteres.</p>`;
        return

    }
    else if (valorCpf.length < 11 || valorCpf.length > 11) {
        erros.innerHTML = `<p>O seu CPF deve ter 11 numeros.</p>`;
        return
    }
    else if (valorSenha2 != valorSenha) {
        erros.innerHTML = `<p>Senhas diferentes, tente novamente.</p>`
        return
    }
    else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: valorNome,
                emailServer: valorEmail,
                cpfServer: valorCpf,
                nomeEmpresaServer: valorEmpresa,
                senhaServer: valorSenha
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO cadastrar()!")

            if (resposta.ok) {
                erros.innerHTML = `<p style="color: green;">Cadastro realizado com sucesso! Redirecionando para a página de login...</p>`;
                setTimeout(() => {
                    window.location.href = "../telas/telaLogin.html";
                }, 1000);
            } else {
                resposta.text().then(texto => {
                    erros.innerHTML = `<p>${texto}</p>`;
                });
            }

            }).catch(function (erro) {
                console.log(erro);
                erros.innerHTML = `<p>Houve um erro ao realizar o cadastro. ${erro.message}</p>`;
            });
    }

}

function entrar() {

    var emailVar = email.value;
    var senhaVar = pass.value;
    var divErros = document.getElementById('erros');

    if (emailVar == "" || senhaVar == "") {
        divErros.innerHTML = "Preencha todos os campos para fazer login";
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.ID_EMPRESA = json.empresaId;
                sessionStorage.REGRA_USUARIO = json.regra;

                setTimeout(function () {
                    window.location = "./dashboardPrincipal.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);

                divErros.innerHTML = texto;

            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    divErros.style.display = "none"
}

function mostrarSenha() {
    var passInput = document.getElementById('pass');
    var passwordIcon = document.getElementById('password_icon');

    if (passInput.type == "password") {
        passInput.type = "text";
        passwordIcon.style.backgroundImage = "url('../img/olhoOn.svg')";
    } else {
        passInput.type = "password";
        passwordIcon.style.backgroundImage = "url('../img/olhoOff.svg')";
    }

}

