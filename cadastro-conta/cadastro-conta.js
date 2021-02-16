async function continuar() {
    var nome1 = document.getElementById("nome_perfil_input_1").value;
    var celular1 = document.getElementById("celuar_input_1").value;
    var nome2 = document.getElementById("nome_perfil_input_2").value;
    var celular2 = document.getElementById("celuar_input_2").value;

    debugger;

    if (nome1 !== "" && celular1 !== "" && nome2 !== "" && celular2 !== "") {
        var corpoJson = {
            nome1: nome1,
            celular1: celular1,
            nome2: nome2,
            celular2: celular2
        };

        var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/users/accounts", {
            method: "POST",
            body: JSON.stringify(corpoJson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var respostaJson = await resposta.json();

        if (resposta.mensagem === 200) {
            localStorage.setItem("mensagem", respostaJson.mensagem);
            alert(respostaJson.mensagem);
            window.location.href = "../cadastro-finalizacao/cadastro-finalizacao.html";
        }
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; contador < erros.length; contador++){
            erros[contador].style.display = "block";
        }
    }


}







// function adicionar(){
//     var files = document.getElementById("uploadFoto").files;
//     var primeiroArquivo = files[0];
//     var urlDaFoto = window.URL.createObjectURL(primeiroArquivo);
//     var adicionar_foto = modelo.content.cloneNode(true);

//     novafoto.querySelector(".foto").src = urlDaFoto;
//     adicionar_conta.appendChild(adicionar_foto);
// }




