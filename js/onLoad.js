    document.getElementById('btnLoad').addEventListener('click', function() {
        var input = document.createElement('input');
        input.type = 'file';

        input.addEventListener('change', function(event) {
            var file = event.target.files[0];

            if (file) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var conteudoHTML = e.target.result;

                    document.getElementById('drop-area').innerHTML = conteudoHTML;

                    // Após carregar o conteúdo, tornar os elementos .divNote draggable
                    makeDivsDraggable();
                    simulateClickEvents();
                    alert("Conteúdo carregado com sucesso!");
                };

                reader.readAsText(file);
            }
        });

        input.click();
    });

    function makeTitleChangeable(element) {
        var h3Elements = element.querySelectorAll('h3');

        h3Elements.forEach(function(h3) {
            h3.setAttribute("spellcheck", "false");

            // Adiciona um ouvinte de evento para o evento "dblclick" no elemento h3
            h3.addEventListener("dblclick", function() {
                // Permite a edição do texto ao clicar duas vezes rapidamente
                h3.contentEditable = true;
                h3.focus();
            });
        });
    }

    // dragUtils.js
    function makeDivsDraggable() {
        // Obter todas as divs com a classe "divNote"
        var div = document.querySelectorAll('.card');

        // Iterar sobre cada divNote e torná-la draggable
        div.forEach(function(div) {
            makeTitleChangeable(div);
            makeElementDraggable(div);
        });
    }


    // Recarregar Funcionalidades botões
    function simulateClickEvents() {

        //============================== To-do ==============================
         // Adicionar
        var addButtons = document.querySelectorAll('.card #btn-new-task');
        addButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                newTask(btn.closest('.card'));
            });
        });
        // Remover
        var removeButtons = document.querySelectorAll('.card #btn-remove-task');
        removeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                removeItem(btn.parentElement);
            });
        });
        // riscar texto nos itens da lista
	var todoLists = document.querySelectorAll('.content--body ol');
	todoLists.forEach(function (olTodoList) {
		clickEventTaskDone(olTodoList);
	});

        //=================================================================
        
        //=================================== Draw ================================
	
	    var canvasElements = document.querySelectorAll('.card canvas');
	    canvasElements.forEach(function (canvas) {
		var ctx = canvas.getContext('2d');
		addDrawingFunctionality(canvas, ctx);
	    });

	    // funcionalidades dos botões do canvas
	    var canvasButtons = document.querySelectorAll('.card button');
	    canvasButtons.forEach(function (button) {
		if (button.textContent === 'Lápis') {
		    button.addEventListener('click', function () {
		        var ctx = button.closest('.card').querySelector('canvas').getContext('2d');
		        ctx.globalCompositeOperation = 'source-over';
		        ctx.strokeStyle = '#000000';
		        ctx.fillStyle = '#FFFFFF';
		    });
		} else if (button.textContent === 'Borracha') {
		    button.addEventListener('click', function () {
		        var ctx = button.closest('.card').querySelector('canvas').getContext('2d');
		        ctx.globalCompositeOperation = 'destination-out';
		        ctx.strokeStyle = '#FFFFFF';
		        ctx.fillStyle = '#FFFFFF';
		    });
		}
	    });

	    // funcionalidades slider
	    var canvasSliders = document.querySelectorAll('.card input[type="range"]');
	    canvasSliders.forEach(function (slider) {
		slider.addEventListener('input', function () {
		    var ctx = slider.closest('.card').querySelector('canvas').getContext('2d');
		    ctx.lineWidth = slider.value;
		});
	    });
	    //=======================================================================
    }

   
