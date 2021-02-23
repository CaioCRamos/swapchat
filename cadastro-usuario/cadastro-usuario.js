async function continuar() {
    var nome = document.getElementById("nome_input").value;
    var celular = document.getElementById("celular_input").value;
    var senha = document.getElementById("senha_input").value;
    var pergunta = document.getElementById("caixa_pergunta").value;
    var resposta = document.getElementById("resposta_input").value;


    if (nome !== "" && celular !== "" && senha !== "" && pergunta !== "" && resposta !== "") {
        var corpoJson = {
            nome: nome,
            celular: celular,
            senha: senha,
            perguntaSeguranca: pergunta,
            respostaSeguranca: resposta
        };

        var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/users", {
            method: "POST",
            body: JSON.stringify(corpoJson),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        var respostaJson = await resposta.json();
       
        if (resposta.status === 201) {
            localStorage.setItem("id", respostaJson.id);
            alert(respostaJson.mensagem);
            window.location.href = "../cadastro-conta/cadastro-conta.html";
        }
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; contador < erros.length; contador++) {
            erros[contador].style.display = "block";
        }
    }

}