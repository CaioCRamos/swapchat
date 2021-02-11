async function entrar() {
    debugger;
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    //temos um usuario cadastrado chamado +5519989876305
    //a senha do usuario é 12345

    var requisicaoJson = {
        phone: celular,
        password: senha
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
        window.location.href = "../cadastro-usuario/cadastro-usuario.html";
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