function validarSessao(){
    const nome = sessionStorage.NOME_USUARIO;
    const email = sessionStorage.EMAIL_USUARIO;
    const id = sessionStorage.ID_USUARIO;

    if(nome == null || email == null || id == null){
        alert("Para visualizar esta página, você precisa estar conectado à sua conta. Por favor, faça o login para continuar.")
        window.location ="TelaLogin.html"
    } else{
        console.log('tudo ok!')
    }
}