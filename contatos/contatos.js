
window.onload = async function () {
    await listarContatos();
}

async function listarContatos() {
    mostrarLoading();

    var idContaUsuario = localStorage.getItem("idContaSelecionada");
    var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/contacts/" + idContaUsuario, {
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
        var idContato = contatos[contador].id;

        var novoContato = modelo.content.cloneNode(true);

        if (imagem !== "") {
            novoContato.querySelector(".icone_contato").src = imagem;
        } 
        
        novoContato.querySelector(".detalhe-nome").innerHTML = nome;
        novoContato.querySelector(".detalhe-telefone").innerHTML = celular;
        novoContato.querySelector(".idContato").value = idContato;

        listaContatos.appendChild(novoContato);
    }

    ocultarLoading();
}

async function selecionarContato(li) {
    var idContato = li.querySelector(".idContato").value;
    if (idContato === "") {
        alert("Esse contato não possui conta no swapchat");
        return;
    }

    var idContaUsuario = localStorage.getItem("idContaSelecionada");
    var corpoJson = {
        idContaUsuario1: idContaUsuario,
        idContaUsuario2: idContato
    };
    var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/chats", {
        method: "POST",
        body: JSON.stringify(corpoJson),
        headers: {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }
    });

    if (resposta.status === 201) {
        window.location.href = "../conversas/conversas.html";
    }
}


