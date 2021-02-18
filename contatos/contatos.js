
window.onload =  async function () {
    await listarContatos();
}

 async function listarContatos() {
    var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/contacts", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }
    });

    var contatos = await resposta.json();

    var listaContatos = document.getElementById("lista_contatos");
    var modelo = document.getElementById("modeloContato");
    for (var contador = 0; contador < contatos.length; contador++) {
        var nome = contatos[contador].nome;
        var celular = contatos[contador].celular;
        var imagem = contatos[contador].imagem;

        var novoContato = modelo.content.cloneNode(true);
        novoContato.querySelector(".icone_contato").src = imagem;
        novoContato.querySelector(".detalhe-nome").innerHTML = nome;
        novoContato.querySelector(".detalhe-telefone").innerHTML = celular;
        listaContatos.appendChild(novoContato);
    }



}




