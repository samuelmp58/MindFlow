document.getElementById('btnSalvar').addEventListener('click', function() {
    // Obter todas as divs com a classe "card" dentro do drop-area
    var divNotes = document.querySelectorAll('.card');

    // Inicializar uma string para armazenar o conteúdo salvo
    var conteudoSalvo = '';

    // Iterar sobre cada divNote e obter o HTML completo, incluindo o texto do textarea
    divNotes.forEach(function(divNote) {
        // Clone a divNote para evitar alterar o DOM original
        var cloneNote = divNote.cloneNode(true);

        // Obter o texto do textarea
        var textoNota = divNote.querySelector('textarea');
        if(textoNota){
		var textoNota = divNote.querySelector('textarea').value;
		// Substituir o conteúdo do textarea no clone
		cloneNote.querySelector('textarea').textContent = textoNota;
	}
        // Adicionar o HTML do clone à string de conteúdo salvo
        conteudoSalvo += cloneNote.outerHTML;
    });

    // Criar um blob com o conteúdo salvo
    var blob = new Blob([conteudoSalvo], { type: 'text/html' });

    // Criar um link de download
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conteudo_salvo.brm';

    // Adicionar o link ao documento e clicar automaticamente para iniciar o download
    document.body.appendChild(link);
    link.click();

    // Remover o link do documento
    document.body.removeChild(link);

    alert("Conteúdo salvo! Verifique o download do arquivo.");
});
