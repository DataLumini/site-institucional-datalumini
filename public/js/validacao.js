function validarSessao() {
   const nome = sessionStorage.NOME_USUARIO;
   const email = sessionStorage.EMAIL_USUARIO;
   const id = sessionStorage.ID_USUARIO;

   if (nome == null || email == null || id == null) {
       alert("Para visualizar esta página, você precisa estar conectado à sua conta. Por favor, faça o login para continuar.")
       window.location = "telaLogin.html"
   } else {
       console.log('tudo ok!')
   }
}

function verificarRegraUsuario() {
    let regraUsuario = sessionStorage.REGRA_USUARIO;
    const chatBotLink = document.getElementById("chatBotLink");

    if (regraUsuario == 2) {
        console.log("Regra do usuario = Suporte");
        if (chatBotLink != undefined) {
            chatBotLink.style.display = "flex";
        }
        gerenciamentoBotaoContainer.style.display = "none";
    } else if (regraUsuario == 1) {
        console.log("Regra do usuario = Administrador da equipe");
        if (chatBotLink != undefined) {
            chatBotLink.style.display = "none";
        }
        gerenciamentoBotaoContainer.style.display = "flex";
    } else {
        console.log("Regra do usuario = Funcionario");
        if (chatBotLink != undefined) {
            chatBotLink.style.display = "none";
        }
        gerenciamentoBotaoContainer.style.display = "none";
    }
}