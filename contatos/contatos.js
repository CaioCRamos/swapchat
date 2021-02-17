var ListaContatos = document.getElementById("lista_contatos");
var modelo = document.getElementById("modeloContato");
var novoContato = modelo.content.cloneNode(true);

novoContato.querySelector(".icone_contato").src = "../imagens/icone-contato.png";