async function cadastrar() {
    mostrarLoading();

    var nome = document.getElementById("nome").value;
    var celular = document.getElementById("celular").value;
    var idContaUsuario = localStorage.getItem("idContaSelecionada");

    document.getElementsByClassName("botao__cadastrar").disabled = true; // desabilitar o botão.
    if (nome !== "" && celular !== "") {
        var corpoJson = {
            idContaUsuario: idContaUsuario,
            nome: nome,
            celular: celular
        };
        var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/contacts", {
            method: "POST",
            body: JSON.stringify(corpoJson),
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem("token")
            }
        });

        if (resposta.status === 201) {
            document.getElementsByClassName("botao__cadastrar").disabled = false; //habilitar botão.
            var respostaJson = await resposta.json()
            alert(respostaJson.mensagem);
            window.location.href = "../contatos/contatos.html";
        }
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; contador < erros.length; contador++) {
            erros[contador].style.display = "block";


        }
    }

    ocultarLoading();
}