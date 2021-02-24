function salvar(){
    alert("obrigado por entrar no swapchat, logo sua nova conta estara logada agradecemos sua colaboração  ")
}

window.onload = function(){
    var conta1= JSON.parse(localStorage.getItem("conta1"));
    var conta2 = JSON.parse(localStorage.getItem("conta2"));

    if(localStorage.getItem("idContaSelecionada") === conta1.id){
        document.getElementById("foto").src = conta1.imagem;
        document.getElementById("nome").value = conta1.nome;
        document.getElementById("email").value = conta1.email;
    } else{
        document.getElementById("foto").src = conta2.imagem;
        document.getElementById("nome").value = conta2.nome;
        document.getElementById("email").value = conta2.email;
    }

}