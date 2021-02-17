var imagem1;
var imagem2;

async function continuar() {
    var nome1 = document.getElementById("nome_perfil_input_1").value;
    var email1 = document.getElementById("email_input_1").value;
    var nome2 = document.getElementById("nome_perfil_input_2").value;
    var email2 = document.getElementById("email_input_2").value;

    debugger;

    if (nome1 !== "" && email1 !== "" && nome2 !== "" && email2 !== "") {
        var corpoJson = {
            id: localStorage.getItem("id"),
            contas:[
                {
                    nome: nome1,
                    email: email1,
                    imagem:imagem1
                },
                {
                    nome: nome2,
                    email: email2,
                    imagem: imagem2
                }
            ]
        }

        var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/users/accounts", {
            method: "POST",
            body: JSON.stringify(corpoJson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var respostaJson = await resposta.json();

        if (resposta.status === 200) {
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

function alteraImagemPerfil1(){
    var arquivos = document.getElementById("enviar_imagem_perfil_1").files;
    var primeiroArquivo = arquivos[0];

    var urlDaFoto = window.URL.createObjectURL(primeiroArquivo);

    var imagemPerfil1 = document.getElementById("imagem_perfil_1");
    imagemPerfil1.src = urlDaFoto;

    obterImagemEmBase64(primeiroArquivo, function (base64Data) {
        imagem1 = base64Data;
    });
}

function alteraImagemPerfil2(){
    var arquivos = document.getElementById("enviar_imagem_perfil_2").files;
    var primeiroArquivo = arquivos[0];

    var urlDaFoto = window.URL.createObjectURL(primeiroArquivo);

    var imagemPerfil2 = document.getElementById("imagem_perfil_2");
    imagemPerfil2.src = urlDaFoto;

    obterImagemEmBase64(primeiroArquivo, function (base64Data) {
        imagem2 = base64Data;
    });
}

function obterImagemEmBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}
