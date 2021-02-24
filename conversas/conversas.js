window.onload = async function () {
    limparDadosConversa();
    listarContas();
    await selecionarConta1();

    setInterval(listarConversas, 5000); //5 seg
    setInterval(listarMensagens, 3000); //5 seg
}

async function listarContas() {
    var conta1 = JSON.parse(localStorage.getItem("conta1"));
    var conta2 = JSON.parse(localStorage.getItem("conta2"));

    var imagemPerfil1 = document.getElementById("imagemPerfil1");
    imagemPerfil1.src = conta1.imagem;

    var imagemPerfil1 = document.getElementById("imagemPerfil2");
    imagemPerfil2.src = conta2.imagem;
}

async function selecionarConta1() {
    limparDadosConversa();

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
    limparDadosConversa();

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
        if (id === localStorage.getItem("idConversaSelecionada")) {
            conversa.children[0].classList.add("conversaSelecionada");
        }

        conversa.querySelector(".nome").innerText = nome;
        conversa.querySelector(".imagem").src = imagem;
        conversa.querySelector(".ultimaMensagem").innerText = ultimaMensagem;
        conversa.querySelector(".id").value = id;

        listaConversas.appendChild(conversa);
    }
}

async function selecionarConversa(li) {
    var id = li.querySelector(".id").value;
    var nome = li.querySelector(".nome").innerText;
    var imagem = li.querySelector(".imagem").src;

    localStorage.setItem("idConversaSelecionada", id);
    localStorage.setItem("nomeConversaSelecionada", nome);
    localStorage.setItem("imagemConversaSelecionada", imagem);

    li.classList.add("conversaSelecionada");    

    await listarMensagens();
}

async function listarMensagens() {
    if (localStorage.getItem("idConversaSelecionada") === "")
        return;

    document.getElementById("nomeConversa").innerText = localStorage.getItem("nomeConversaSelecionada");
    document.getElementById("imagemConversa").src = localStorage.getItem("imagemConversaSelecionada");
    document.getElementById("imagemConversa").style.display = "flex";
    document.getElementById("detalheConversa").style.display = "flex";

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
    var mensagem = document.getElementById("mensagem").value;

    var url = "https://swapchat-api.herokuapp.com/v1/chats/messages";

    var envioMensagem = {
        idConversa: localStorage.getItem("idConversaSelecionada"),
        idContaUsuario: localStorage.getItem("idContaSelecionada"),
        mensagem: mensagem
    };

    var resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(envioMensagem),
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }
    });

    if (resposta.status === 200) {
        listarMensagens();
        document.getElementById("mensagem").value = "";
    }
}

function limparDadosConversa() {
    localStorage.setItem("idConversaSelecionada", "");

    document.getElementById("imagemConversa").style.display = "none";
    document.getElementById("detalheConversa").style.display = "none";

    document.getElementById("nomeConversa").innerText = "";
    document.getElementById("mensagens").innerHTML = "";
}