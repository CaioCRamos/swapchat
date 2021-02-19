var conversas = [
    {
        id:0,
        nome: "Caio",
        imagem: "../imagens/perfilPadrao.jpg",
        ultimaMensagem: "Terminou o trabalho?"
    },
    {
        id:1,
        nome: "Milena",
        imagem: "../imagens/perfilPadrao.jpg",
        ultimaMensagem: "passa o link"
    },
    {
        id:2,
        nome: "Renan",
        imagem: "../imagens/perfilPadrao.jpg",
        ultimaMensagem: "avisa que vou atrasar"
    }

];

var chat = [
    {
        nome: "Usuario1",
        mensagem: "ta ae??"
    },
    {
        nome: "Usuario2",
        mensagem: "to sim"
    }
];

window.onload = function () {
    listarConversas();
}

function listarConversas() {
    var listaConversas = document.getElementById("listaConversas");
    var modelo = document.getElementById("modeloConversa");

    for (var contador = 0; contador < conversas.length; contador++) {
        var nome = conversas[contador].nome;
        var imagem = conversas[contador].imagem;
        var ultimaMensagem = conversas[contador].ultimaMensagem;
        var id = conversas[contador].id;

        var conversa = modelo.content.cloneNode(true);

        conversa.querySelector(".nome").innerText = nome;
        conversa.querySelector(".imagem").src = imagem;
        conversa.querySelector(".ultimaMensagem").innerText = ultimaMensagem;
        conversa.querySelector(".id").value = id;

        listaConversas.appendChild(conversa);
    }
}

var mensagens = [];
var usuario = [];

// function listaDeMensagem() {
//     var listaDeMensagens = document.getElementById("mensagens");

//     listaDeMensagens.innerHTML = '';

//     for (var contador = 0; contador < mensagens.length; contador++) {
//         var mensagem =  mensagens[contador];

//         var li = document.createElement("li");
//         li.innerHTML = mensagem;

//         listaDeMensagens.appendChild(li);
//     }
// }

// function enviarMensagens() {
//     var campoMensagemUsuario = document.getElementById("mensagem");
//     var mensagemUsuario = campoMensagemUsuario.value;

//     if (mensagemUsuario !== '') {
//         mensagens.push(mensagemUsuario);
//         usuarios.push("campo");
//         listarMensagens();
//         campoMensagemUsuario.value = '';
//     }
// }

function mostrarConversa (li) {
    var id = li.querySelector(".id").value;
    alert(id)
}

