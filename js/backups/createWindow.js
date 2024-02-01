// Note
function createNoteWindow(title) {
    var newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.id = "card-note";

    // Adiciona a área de arrasto acima do título
    var dragArea = document.createElement("div");
    dragArea.className = "drag-area";
    newDiv.appendChild(dragArea);

    // Adiciona um indicador visual na área de arrasto
    var indicator = document.createElement("div");
    indicator.textContent = "↓ Click & Drag";
    indicator.style.textAlign = "center";
    indicator.style.fontStyle = "italic";
    indicator.style.fontSize = "10px";
    dragArea.appendChild(indicator);

    // Adiciona o título h3
    var h3 = document.createElement("h3");
    h3.textContent = title;

    // Desativa a verificação ortográfica no elemento h3
    h3.setAttribute("spellcheck", "false");

    // Adiciona um ouvinte de evento para o evento "dblclick" no elemento h3
    h3.addEventListener("dblclick", function () {
        // Permite a edição do texto ao clicar duas vezes rapidamente
        h3.contentEditable = true;
        h3.focus();
    });

    var textarea = document.createElement("textarea");
    textarea.name = "";
    textarea.id = "";
    textarea.cols = "30";
    textarea.rows = "10";
    textarea.setAttribute("spellcheck", "false");

    newDiv.appendChild(h3);
    newDiv.appendChild(textarea);

    return newDiv;
}

// To-do
// Função para criar uma instância de to-do
function createToDoWindow(title) {
    // Cria a div principal
    var newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.id = "card-todo";

    // Adiciona a área de arrasto acima do título
    var dragArea = document.createElement("div");
    dragArea.className = "drag-area";
    newDiv.appendChild(dragArea);

    // Adiciona um indicador visual na área de arrasto
    var indicator = document.createElement("div");
    indicator.textContent = "↓ Click & Drag";
    indicator.style.textAlign = "center";
    indicator.style.fontStyle = "italic";
    indicator.style.fontSize = "10px";
    dragArea.appendChild(indicator);

    // Adiciona o título h3
    var h3 = document.createElement("h3");
    h3.textContent = title;

    // Desativa a verificação ortográfica no elemento h3
    h3.setAttribute("spellcheck", "false");

    // Adiciona um ouvinte de evento para o evento "dblclick" no elemento h3
    h3.addEventListener("dblclick", function () {
        // Permite a edição do texto ao clicar duas vezes rapidamente
        h3.contentEditable = true;
        h3.focus();
    });

    newDiv.appendChild(h3);

    // Adiciona o input à mesma div
    var inputNewTask = document.createElement("input");
    inputNewTask.type = "text";
    inputNewTask.id = "input-new-task";
    inputNewTask.placeholder = "Digite sua nova task";
    newDiv.appendChild(inputNewTask);

    // Adiciona o botão ao lado do input
    var btnNewTask = document.createElement("button");
    btnNewTask.onclick = function () { newTask(newDiv); };
    btnNewTask.id = "btn-new-task";
    btnNewTask.title = "Clique aqui para adicionar uma nova task";

    // Cria o ícone do botão
    var svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("width", "16");
    svgIcon.setAttribute("height", "16");
    svgIcon.setAttribute("fill", "currentColor");
    svgIcon.setAttribute("class", "bi bi-plus-lg");
    svgIcon.setAttribute("viewBox", "0 0 16 16");

    // Cria o path do ícone
    var pathIcon = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathIcon.setAttribute("fill-rule", "evenodd");
    pathIcon.setAttribute("d", "M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z");

    // Adiciona o path ao ícone
    svgIcon.appendChild(pathIcon);
    btnNewTask.appendChild(svgIcon);

    // Adiciona o botão à div principal
    newDiv.appendChild(btnNewTask);

    // Adiciona a div com a classe content--body e ol com o ID to-do-list
    var contentBody = document.createElement("div");
    contentBody.className = "content--body";

    // Gera um identificador único baseado no número de instâncias existentes
    var todoIndex = document.querySelectorAll('.card').length;
    var olToDoList = document.createElement("ol");
    olToDoList.id = "to-do-list-" + todoIndex;

    contentBody.appendChild(olToDoList);
    newDiv.appendChild(contentBody);

    return newDiv;
}

// Função para adicionar uma nova tarefa
function newTask(todoDiv) {
    let input = todoDiv.querySelector('#input-new-task');
    input.style.border = '';

    // validation
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask(todoDiv)) {
        alert('Já existe uma task com essa descrição');
    } else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(getLocalStorageKey(todoDiv)) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(getLocalStorageKey(todoDiv), JSON.stringify(values));
        showValues(todoDiv);
    }
    input.value = '';
}

// Função para validar se uma nova tarefa já existe
function validateIfExistsNewTask(todoDiv) {
    let values = JSON.parse(localStorage.getItem(getLocalStorageKey(todoDiv)) || "[]");
    let inputValue = todoDiv.querySelector('#input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

// Função para exibir as tarefas
function showValues(todoDiv) {
    let values = JSON.parse(localStorage.getItem(getLocalStorageKey(todoDiv)) || "[]");
    let list = todoDiv.querySelector('.content--body ol');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='${list[i]}' onclick='removeItem("${values[i]['name']}", ${i})'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`;
    }
}


// Função para remover uma tarefa
function removeItem(data, index) {
    let todoDivs = document.querySelectorAll('.card');

    todoDivs.forEach((todoDiv) => {
        let values = JSON.parse(localStorage.getItem(getLocalStorageKey(todoDiv)) || "[]");
        let dataIndex = values.findIndex(x => x.name == data);

        // Verifica se o índice é válido e se o valor corresponde
        if (dataIndex !== -1 && dataIndex === index) {
            values.splice(dataIndex, 1);
            localStorage.setItem(getLocalStorageKey(todoDiv), JSON.stringify(values));
            showValues(todoDiv);
        }
    });
}

// Função para obter a chave única para localStorage com base na instância de to-do
function getLocalStorageKey(todoDiv) {
    var todoIndex = Array.from(document.querySelectorAll('.card')).indexOf(todoDiv);
    return `to-do-list-gn-${todoIndex}`;
}



