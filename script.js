/*Variaveis para controlar a tela de login e inicial*/
var telaLogin = document.querySelector("#tela-login");
var telaLogado = document.querySelector("#tela-logado");
var telaPrincipal = document.querySelector("#tela-principal");

var menuPrincipal = document.querySelector("#menu-principal");
var menuInteracao = document.querySelector("#menu-interacao");
var txtVoltar = document.querySelector('#txtVoltar');
var fundoLogado = document.querySelector("#fundo-logado");

verificaLogin();

/*Variaveis de controle da requisicao de login*/
var btLogin = document.querySelector('#btLogin');

/*Funcao para Voltar a pagina de login*/
document.querySelector('#txtAcesseConta').addEventListener("click", function (){
    txtVoltar.className = "voltar-menu-principal showTrue";
    telaLogin.className = "fundo-login showTrue";
    telaPrincipal.className = "container-body showFalse";
    menuPrincipal.className = "menu showFalse";
    menuInteracao.className = "interacao-usuario showFalse";
    telaLogado.className = "tela-logado showFalse";
    fundoLogado.className = "fundo-logado showFalse";
});

/*Funcao para Voltar a pagina inicial*/
document.querySelector('#txtVoltar').addEventListener("click", function (){
    menuPrincipal.className = "menu showTrue";
    menuInteracao.className = "interacao-usuario showTrue";
    txtVoltar.className = "voltar-menu-principal showFalse";
    telaLogin.className = "fundo-login showFalse";
    telaPrincipal.className = "container-body showTrue";
    telaLogado.className = "tela-logado showFalse";
    fundoLogado.className = "fundo-logado showFalse";
});


/*Funcao que habilita o botao entrar do login*/
document.querySelector('#txtUsuario').addEventListener("keyup", function() {
    var email = document.querySelector('#txtUsuario').value;
    var senha = document.querySelector('#txtSenha').value;
    if (email.length > 3 && senha.length > 3) {
        btLogin.className = "entra layout-button-xp";
        return;
    } else {
        btLogin.className = "entra";
    }
});

/*Funcao que habilita o botao entrar do login*/
document.querySelector('#txtSenha').addEventListener("keyup", function() {
    var email = document.querySelector('#txtUsuario').value;
    var senha = document.querySelector('#txtSenha').value;
    if (email.length > 3 && senha.length > 3) {
        btLogin.className = "entra layout-button-xp";
        return;
    } else {
        btLogin.className = "entra";
    }
});

/*Funcao para verificar API reqres.in*/
document.querySelector('#btLogin').addEventListener("click", function() {
    var email = document.querySelector('#txtUsuario').value;
    var senha = document.querySelector('#txtSenha').value;

    /*Verifica se o usuário esta logado*/
    if (sessionStorage.getItem("login") == 1 && sessionStorage.getItem("token")) return;
    if (btLogin.className == "entra layout-button-xp") {
        axios
        .post("https://reqres.in/api/login", {
            email: email,
            password: senha
        })
        .then(function(response) {
            if (response.status == 200) {
                realizaLogin(email, response.data.token);
            }
        })
        .catch (function (error) {
            document.querySelector('#txtUsuario').value = 'Login Falhou - Tente Novamente';
            document.querySelector('#txtSenha').value = '';
            btLogin.className = "entra";
            return;
        });
    }
    document.querySelector('#txtUsuario').value = '';
    document.querySelector('#txtSenha').value = '';
});


/*Funcao auxiliar de login salvar no storage*/
function realizaLogin (email, token) {
    /*Ocultar tela de login*/
    txtVoltar.className = "voltar-menu-principal showFalse";
    telaLogin.className = "fundo-login showFalse";
    telaPrincipal.className = "container-body showFalse";
    menuPrincipal.className = "menu showFalse";
    menuInteracao.className = "interacao-usuario showFalse";

    /*Implementar tela de buscas e logado*/
    telaLogado.className = "tela-logado showTrue";
    fundoLogado.className = "fundo-logado showTrue";
    document.querySelector("#lblBoasVindas").innerHTML = "Bem-vindo, " + email;

    /*Salva o login no storagedo navegador*/
    sessionStorage.setItem("login", 1);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("token", token);
}

function verificaLogin () {
    if (sessionStorage.getItem("login") == 1 && sessionStorage.getItem("token")) {
        /*Ocultar tela de login*/
        txtVoltar.className = "voltar-menu-principal showFalse";
        telaLogin.className = "fundo-login showFalse";
        telaPrincipal.className = "container-body showFalse";
        menuPrincipal.className = "menu showFalse";
        menuInteracao.className = "interacao-usuario showFalse";

        /*Implementar tela de buscas e logado*/
        telaLogado.className = "tela-logado showTrue";
        fundoLogado.className = "fundo-logado showTrue";
        document.querySelector("#lblBoasVindas").innerHTML = "Bem-vindo, " + sessionStorage.getItem("email");
    }
}

document.querySelector('#btLogout').addEventListener('click', function () {
    sessionStorage.clear();
    
    menuPrincipal.className = "menu showTrue";
    menuInteracao.className = "interacao-usuario showTrue";
    txtVoltar.className = "voltar-menu-principal showFalse";
    telaLogin.className = "fundo-login showFalse";
    telaPrincipal.className = "container-body showTrue";
    telaLogado.className = "tela-logado showFalse";
    fundoLogado.className = "fundo-logado showFalse";

    document.querySelector('#txtUsuario').innerHTML = '';
    document.querySelector('#txtSenha').innerHTML = '';
});