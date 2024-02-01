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

    clickEventTaskDone(olToDoList);

    contentBody.appendChild(olToDoList);
    newDiv.appendChild(contentBody);

    return newDiv;
}


// Draw
function createDrawWindow(title) {
  // Create the main div
  var newDiv = document.createElement("div");
  newDiv.className = "card";
  newDiv.id = "card-draw";

  // Add the drag area above the title
  var dragArea = document.createElement("div");
  dragArea.className = "drag-area";
  newDiv.appendChild(dragArea);

  // Add a visual indicator in the drag area
  var indicator = document.createElement("div");
  indicator.textContent = "↓ Click & Drag";
  indicator.style.textAlign = "center";
  indicator.style.fontStyle = "italic";
  indicator.style.fontSize = "10px";
  dragArea.appendChild(indicator);

  // Add the title h3
  var h3 = document.createElement("h3");
  h3.textContent = title;

  // Disable spell check on the h3 element
  h3.setAttribute("spellcheck", "false");

  // Add an event listener for the "dblclick" event on the h3 element
  h3.addEventListener("dblclick", function () {
    // Allow editing of the text by double-clicking
    h3.contentEditable = true;
    h3.focus();
  });

  newDiv.appendChild(h3);

  // Add buttons
  var buttonsDiv = document.createElement("div");

  // Pencil button
  var pencilButton = createButton("Lápis", function () {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FFFFFF";
  });
  buttonsDiv.appendChild(pencilButton);

  // Eraser button
  var eraserButton = createButton("Borracha", function () {
  ctx.globalCompositeOperation = "destination-out";
  ctx.strokeStyle = "#FFFFFF";
  ctx.fillStyle = "#FFFFFF";
  }, function () {
    var canvasStyle = getComputedStyle(canvas);
    var canvasBackgroundColor = canvasStyle.backgroundColor;
    console.log("Canvas Background Color:", canvasBackgroundColor);
  });
  buttonsDiv.appendChild(eraserButton);

  // Thickness slider
  var thicknessSlider = createSlider(1, 50, 5, function (value) {
    ctx.lineWidth = value;
  });
  buttonsDiv.appendChild(thicknessSlider);

  newDiv.appendChild(buttonsDiv);

  // Add the canvas to the same div
  var canvas = createCanvas(500, 500);
  newDiv.appendChild(canvas);

  // Get the 2D context of the canvas
  var ctx = canvas.getContext("2d");

  // Set the default stroke style to black
  ctx.strokeStyle = "#000000";

  // Set the background color to white
  //ctx.fillStyle = "#FFFFFF";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add drawing functionality
  addDrawingFunctionality(canvas, ctx);

  return newDiv;
}



