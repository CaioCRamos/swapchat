var formCadastro = document.querySelectorAll('.cadastro');
/* a variavel esta selecionando uma class do HTML*/ 
var formBtn = document.querySelector('.botão__continuar');
/* esta selecionando uma class do html (o botão)*/

formBtn.addEventListener('click', function(e)
/* addEventListener - adiciona o botão na lista,função para dizer o que vai acontecer 
quando o usuário clicar em um botão*/ 
{
  for(var i = 0; i <formCadastro.length; i++) { /* contador*/ 
    var currentInput = formCadastro[i];
    var inputParent = currentInput.parentNode;
    
     // Se a entrada for inválida e NÃO for o campo de e-mail, adicione a classe de erro e remova o marcador
     if((!currentInput.validity.valid) && (currentInput.getAttribute('id') !== 'caixa_celular_input')) {

        inputParent.classList.add('error');
        e.preventDefault();
      
      } else {
        inputParent.classList.remove('error'); // se nada disso acontecer, remove o error, e segue.
      }
    };
});