async function entrar() {
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    var requisicaoJson = {
        celular: celular,
        senha: senha
    };

    var resposta = await fetch("https://swapchat-api.herokuapp.com/v1/users/login", {
        method: "POST",
        body: JSON.stringify(requisicaoJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var respostaJson = await resposta.json();

    //200 significa OK
    //404 significa ERRO

    /*
    RESPOSTA DO JSON DE LOGIN
    {
      "id": "602f32f9fe6c27001566ecea",
      "nome": "Caio Ramos",
      "contas": [
        {
          "id": "602f3304fe6c27001566eceb",
          "nome": "Conta pessoal",
          "email": "caio.campsv@gmail.com",
          "imagem": "https://swapchat-api.herokuapp.com/v1/users/accounts/image/604df5e9-178b-435f-361c-969da088abdf.png"
        },
        {
          "id": "602f3304fe6c27001566ecec",
          "nome": "Conta profissional",
          "email": "caio.ramos@categoriadebase.org",
          "imagem": "https://swapchat-api.herokuapp.com/v1/users/accounts/image/8665618f-c032-6605-2b6c-20a9da4cf223.png"
        }
      ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmYzMmY5ZmU2YzI3MDAxNTY2ZWNlYSIsIm5hbWUiOiJDYWlvIFJhbW9zIiwiaWF0IjoxNjEzNzM3NjcyLCJleHAiOjE2MTYzMjk2NzJ9.cR90t__sKc2RclvKXL1kQMT-LBJ8-c8toizsoxbzd-o"
    }
    */

    if (resposta.status === 200) {
        var conta1 = respostaJson.contas[0];
        var conta2 = respostaJson.contas[1];

        localStorage.setItem("conta1", JSON.stringify(conta1));
        localStorage.setItem("conta2", JSON.stringify(conta2));
        localStorage.setItem("token", respostaJson.token);

        window.location.href = "../conversas/conversa.html";
    } else {
        var erros = document.getElementsByClassName("form--error");
        for (var contador = 0; erros.length; contador++) {
            erros[contador].style.display = "block";
        }
    }
}

function cadastro() {
    window.setTimeout(() => {
        window.location.href = "../cadastro-usuario/cadastro-usuario.html";
    }, 100);
}


/*
RESPOSTA DO JSON DE LOGIN
{
  "id": "602f32f9fe6c27001566ecea",
  "nome": "Caio Ramos",
  "contas": [
    {
      "id": "602f3304fe6c27001566eceb",
      "nome": "Conta pessoal",
      "email": "caio.campsv@gmail.com",
      "imagem": "https://swapchat-api.herokuapp.com/v1/users/accounts/image/604df5e9-178b-435f-361c-969da088abdf.png"
    },
    {
      "id": "602f3304fe6c27001566ecec",
      "nome": "Conta profissional",
      "email": "caio.ramos@categoriadebase.org",
      "imagem": "https://swapchat-api.herokuapp.com/v1/users/accounts/image/8665618f-c032-6605-2b6c-20a9da4cf223.png"
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmYzMmY5ZmU2YzI3MDAxNTY2ZWNlYSIsIm5hbWUiOiJDYWlvIFJhbW9zIiwiaWF0IjoxNjEzNzM3NjcyLCJleHAiOjE2MTYzMjk2NzJ9.cR90t__sKc2RclvKXL1kQMT-LBJ8-c8toizsoxbzd-o"
}
*/