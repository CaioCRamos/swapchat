function adicionar(){



    var files = document.getElementById("uploadFoto").files;
    var primeiroArquivo = files[0];
    var urlDaFoto = window.URL.createObjectURL(primeiroArquivo);
    var adicionar_foto = modelo.content.cloneNode(true);
           
    novafoto.querySelector(".foto").src = urlDaFoto;
    adicionar_conta.appendChild(adicionar_foto);
}


    


   