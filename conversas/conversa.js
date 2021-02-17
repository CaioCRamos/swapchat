var conversas = [
    {
        nome: "Caio",
        imagem: "",
        ultimaMensagem: "Terminou o trabalho?"
    },
    {
        nome: "Milena",
        imagem: "",
        ultimaMensagem: "passa o link"
    },
    {
        nome: "Renan",
        imagem: "",
        ultimaMensagem: "avisa que vou atrasar"
    }
]

window.onload = function(){
    listarConversas();
}

function listarConversas() {
    var listaConversas = document.getElementById("listaConversas");

    for (var contador = 0; contador < conversas.length; contador++) {
        var li = document.createElement("li");
        li.innerHTML = conversas[contador].nome;

        var nome = conversas[contador].nome;
        var imagem = conversas[contador].imagem;
        var ultimaMensagem = conversas[contador].ultimaMensagem;

        listaConversas.appendChild(li);
    }
}