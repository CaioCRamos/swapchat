async function cadastrar() {
    var nome = document.getElementById("nome").value;
    var celular = document.getElementById("celular").value;


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
                "x-access-token": localStorage.getItem("token")
            }
        });
        if (resposta.status === 201) {
            localStorage.setItem("id", respostaJson.id);
            alert(respostaJson.mensagem);
            window.location.href = "../cadastro-conta/cadastro-conta.html";
        }
    } else if (resposta.status === 400) {
        alert(respostaJson.mensagem);

    }
}
