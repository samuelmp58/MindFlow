// Função para adicionar uma nova tarefa
function newTask(todoDiv) {
    let input = todoDiv.querySelector('#input-new-task');
    input.style.border = '';

    // Validando...
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir na lista');
    } else {
        // Atualizar a tela
        let olToDoList = todoDiv.querySelector('.content--body ol');
        let newTask = document.createElement("li");
        newTask.textContent = input.value;
        newTask.appendChild(createRemoveButton(newTask));
        olToDoList.appendChild(newTask);
        input.value = '';
    }
}

function clickEventTaskDone(olTodoList) {
    olTodoList.addEventListener("click", function (event) {
        // Verifica se o clique foi em um elemento li dentro da lista
        if (event.target.tagName === 'LI') {
            // Adiciona ou remove a classe task-done ao elemento li clicado
            event.target.classList.toggle('task-done');
        }
    });
}

// Função para criar o botão de remoção
function createRemoveButton(task) {
    var btnRemove = document.createElement("button");
    btnRemove.onclick = function () { task.remove(); };
    btnRemove.textContent = 'Remover';
    btnRemove.id = 'btn-remove-task'
    return btnRemove;
}

// Função para remover uma tarefa
function removeItem(task) {
    task.remove();
}
