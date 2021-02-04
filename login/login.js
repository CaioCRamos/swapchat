function entrar() {
    debugger;
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    //temos um usuario cadastrado chamado +5519989876305
    //a senha do usuario é 12345

    if(celular === "+5519989876305" && senha === "12345"){
        // var erros = document.getElementsByClassName("form--error");
        // for(var contador = 0; erros.length; contador++){
        //   erros[contador].style.display="none";
        // }
        alert("Parabéns você tá Logado"); //não funciona fora do for
    }else{
      var erros = document.getElementsByClassName("form--error");
      for(var contador = 0; erros.length; contador++){
        erros[contador].style.display="block";
      }
    }
}

function cadastro() { 
  window.setTimeout(() => {
    window.location = "https://www.google.com/webhp?hl=pt-BR&sa=X&ved=0ahUKEwj7z7zmk9DuAhV8H7kGHS9uCPsQPAgI";
 }, 100);
}