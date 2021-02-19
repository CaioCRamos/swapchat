async function entrar() {
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    var requisicaoJson = {
        celular: celular,
        senha: senha
    };

    var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/users/login", {
        method: "POST",
        body: JSON.stringify(requisicaoJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var respostaJson = await resposta.json();
    
    //200 significa OK
    //404 significa ERRO
    if (resposta.status === 200) {
        localStorage.setItem("token", respostaJson.token);
        window.location.href = "../conversas/conversa.html";
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; erros.length; contador++) {
            erros[contador].style.display = "block";
        }
    }
}

function cadastro() {
    window.setTimeout(() => {
        window.location.href = "../cadastro-usuario/cadastro-usuario.html";
    }, 100);
}