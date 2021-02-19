async function cadastrar() {
    var nome = document.getElementById("nome").value;
    var celular = document.getElementById("celular").value;

    debugger;

    if (nome !== "" && celular !== "") {
        var corpoJson = {
            nome: nome,
            celular: celular
        };
        var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/contacts", {
            method: "POST",
            body: JSON.stringify(corpoJson),
            headers: {
                'Content-Type': 'application/json',
                // "x-access-token": localStorage.getItem("token")
            }
        });
        if (resposta.status === 201) {
            alert(respostaJson.mensagem);
            window.location.href = "../contatos/contatos.html";
        }
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; contador < erros.length; contador++) {
            erros[contador].style.display = "block";


        }
    }
}