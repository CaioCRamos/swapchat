function entrar() {
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    //temos um usuario cadastrado chamado +5519989876305
    //a senha do usuario é 12345

    if(celular === "+5519989876305" && senha === "12345"){
        var erros = document.getElementsByClassName("form--error");
        for(var contador = 0; erros.length; contador++){
          erros[contador].style.display="none";
        }
        alert("Parabens ta Logado");
    }else{
      var erros = document.getElementsByClassName("form--error");
      for(var contador = 0; erros.length; contador++){
        erros[contador].style.display="block";
      }
    }
}