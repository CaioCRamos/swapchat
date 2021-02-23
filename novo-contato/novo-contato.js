async function cadastrar() {
    var nome = document.getElementById("nome").value;
    var celular = document.getElementById("celular").value;
    var idContaUsuario = localStorage.getItem("idContaSelecionada");

    debugger;

    if (nome !== "" && celular !== "") {
        var corpoJson = {
            idContaUsuario:idContaUsuario,
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
        //  //desabilita o botão no início
        //  document.getElementById("botao__cadastrar").disabled = true;

        //  //cria um event listener que escuta mudanças no input
        //  document.getElementsByClassName("contato_novo").addEventListener("contato_novo", function (event) {
 
        //      //busca conteúdo do input
        //      var conteudo = document.getElementsByClassName("contato_novo").value;
 
        //      //valida conteudo do input 
        //      if (conteudo !== null && conteudo !== '') {
        //          //habilita o botão
        //          document.getElementById("botao__cadastrar").disabled = false;
        //      } else {
        //          //desabilita o botão se o conteúdo do input ficar em branco
        //          document.getElementById("botao__cadastrar").disabled = true;
        //      }
        //  });
        if (resposta.status === 201) {
            var respostaJson =  await resposta.json()
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