window.onload = async function () {
    listarContas();
    await selecionarConta1();

    setInterval(listarConversas, 5000);
    setInterval(listarMensagens, 5000);
}

async function listarContas() {
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

async function selecionarConversa(li) {
    var id = li.querySelector(".id").value;
    var nome = li.querySelector(".nome").value;

    localStorage.setItem("idConversaSelecionada", id);
    localStorage.setItem("nomeConversaSelecionada", nome);

    await listarMensagens();
}

async function listarMensagens() {
    if (localStorage.getItem("idConversaSelecionada") === "")
        return;

    document.getElementById("nomeConversa").value = localStorage.getItem("nomeConversaSelecionada");

    var url = "https://swapchat-api.herokuapp.com/v1/chats/messages/"
        + localStorage.getItem("idConversaSelecionada")
        + "/" + localStorage.getItem("idContaSelecionada");

    var resposta = await fetch(url, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });

    var mensagens = await resposta.json();

    listaMensagens = document.getElementById("mensagens");
    listaMensagens.innerHTML = "";

    for (var contador = 0; contador < mensagens.length; contador++) {
        var novoLi = document.createElement("li");

        if (mensagens[contador].usuario === "usuario1") {
            novoLi.classList.add("mensagemUsuario1");
        } else {
            novoLi.classList.add("mensagemUsuario2");
        }

        var novoP = document.createElement("p");
        novoP.classList.add("mensagem");
        novoP.innerHTML = mensagens[contador].mensagem;

        novoLi.appendChild(novoP);
        listaMensagens.appendChild(novoLi);
    }
}

async function enviarMensagem() {
    debugger
    var mensagem = document.getElementById("mensagem").value;

    var url = "https://swapchat-api.herokuapp.com/v1/chats/messages";

    var envioMensagem = {
        idConversa: localStorage.getItem("idConversaSelecionada"),
        idContaUsuario: localStorage.getItem("idContaSelecionada"),
        mensagem: mensagem
    };

    var resposta = await fetch(url, {
        method: "POST",
        body:JSON.stringify(envioMensagem),
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }
    });
    
    if(resposta.status === 200){
        listarMensagens();
        document.getElementById("mensagem").value = "";
    }
}
