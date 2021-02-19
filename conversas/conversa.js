window.onload = async function () {
    listarContas();
    await selecionarConta1();
}

function listarContas() {
    var conta1 = JSON.parse(localStorage.getItem("conta1"));
    var conta2 = JSON.parse(localStorage.getItem("conta2"));

    var imagemPerfil1 = document.getElementById("imagemPerfil1");
    // imagemPerfil1.src = conta1.imagem;

    var imagemPerfil1 = document.getElementById("imagemPerfil2");
    // imagemPerfil2.src = conta2.imagem;
}

async function selecionarConta1() {
    var conta1 = JSON.parse(localStorage.getItem("conta1"));
    localStorage.setItem("idContaSelecionada", conta1.id);

    var imagemPerfil1 = document.getElementById("imagemPerfil1");
    //substitui o estilo de "não selecionada" para "selecionada"
    imagemPerfil1.classList.replace("fotoNaoSelecionada", "fotoSelecionada");

    var imagemPerfil2 = document.getElementById("imagemPerfil2");
    //substitui o estilo de "selecionada" para "não selecionada"
    imagemPerfil2.classList.replace("fotoSelecionada", "fotoNaoSelecionada");

    //Listagem das coisas da conta
    await listarConversas();
}

async function selecionarConta2() {
    var conta2 = JSON.parse(localStorage.getItem("conta2"));
    localStorage.setItem("idContaSelecionada", conta2.id);

    var imagemPerfil2 = document.getElementById("imagemPerfil2");
    //substitui o estilo de "não selecionada" para "selecionada"
    imagemPerfil2.classList.replace("fotoNaoSelecionada", "fotoSelecionada");

    var imagemPerfil1 = document.getElementById("imagemPerfil1");
    //substitui o estilo de "selecionada" para "não selecionada"
    imagemPerfil1.classList.replace("fotoSelecionada", "fotoNaoSelecionada");

    //Listagem das coisas da conta
    await listarConversas();
}

async function listarConversas() {
    var url = "https://swapchat-api.herokuapp.com/v1/chats/" + localStorage.getItem("idContaSelecionada");
    var resposta = await fetch(url, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }) 

    var conversas = await resposta.json();

    var listaConversas = document.getElementById("listaConversas");
    var modelo = document.getElementById("modeloConversa");

    listaConversas.innerHTML = "";

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

var mensagens = [
    {
        usuario: "usuario1",
        mensagem: "eae mano"
    },
    {
        usuario: "usuario1",
        mensagem: "tudo certo"
    },
    {
        usuario: "usuario2",
        mensagem: "to de boas"
    },
    {
        usuario: "usuario1",
        mensagem: "show"
    },
]

function mostrarConversa(li) {
    var id = li.querySelector(".id").value;
        
    //peguei as mensagens existentes na API
    listarMensagens();
   
}

function listarMensagens(){
    listaMensagens = document.getElementById("mensagens");
    listaMensagens.innerHTML = "";

    for(var contador = 0; contador < mensagens.length; contador ++) {
        var novoLi = document.createElement("li");
        
        if (mensagens[contador].usuario === "usuario1"){
            novoLi.classList.add("mensagemUsuario1");
        }else{
            novoLi.classList.add("mensagemUsuario2");
        }

        var novoP = document.createElement("p");
        novoP.classList.add("mensagem");
        novoP.innerHTML = mensagens[contador].mensagem;

        novoLi.appendChild(novoP);
        listaMensagens.appendChild(novoLi);
    }
}

function enviarMensagem(){
    var mensagem = document.getElementById("mensagem").value;
    mensagens.push({
        usuario: "usuario1",
        mensagem: mensagem
    });
    listarMensagens();
    
    document.getElementById("mensagem").value = "";
 }
