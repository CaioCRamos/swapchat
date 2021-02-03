function continuar(){
  var nome= document.getElementById("nome_input").Value;
  var celular= document.getElementById("celular_input").value;
  var senha= documente.getElementById("senha_input").value;
  var resposta= document.getElementById("resposta_input").value;


  if (nome === "" && celular === "" && senha === "" && resposta === "") {
    alert("Cadastro efetuado com sucesso!");

}else{
  var error= document.getElementsByClassName("form--error");
  for (var contador = 0; contador < error.length; contador++);
}
}