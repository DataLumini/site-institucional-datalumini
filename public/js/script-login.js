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
                   // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)

                    setTimeout(function () {
                        window.location = "./dashboardEstufa.html";
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
        cardErro.style.display = "none"
    }

function mostrarSenha() {
    var passInput = document.getElementById('pass');
    var passwordIcon = document.getElementById('password_icon');

    if (passInput.type == "password") {
        passInput.type = "text";
        passwordIcon.style.backgroundImage = "url('./img/olhoOn.svg')";
    } else {
        passInput.type = "password";
        passwordIcon.style.backgroundImage = "url('./img/olhoOff.svg')";
    }

}

