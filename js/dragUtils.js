function makeElementDraggable(element) {
    var isDragging = false;
    var offsetX, offsetY;
    var trashCan = document.getElementById('trash-can');

    var titleBar = element.querySelector(".drag-area");

    titleBar.addEventListener("mousedown", function (event) {
        isDragging = true;
        offsetX = event.clientX - parseFloat(getComputedStyle(element).left);
        offsetY = event.clientY - parseFloat(getComputedStyle(element).top);
        element.style.cursor = "move";
        trashCan.style.display = 'block';
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging) {
            element.style.left = event.clientX - offsetX + "px";
            element.style.top = event.clientY - offsetY + "px";

            // Verifica se o mouse está sobre a lixeira
            if (
                event.clientX >= trashCan.offsetLeft &&
                event.clientX <= trashCan.offsetLeft + trashCan.offsetWidth &&
                event.clientY >= trashCan.offsetTop &&
                event.clientY <= trashCan.offsetTop + trashCan.offsetHeight
            ) {
                trashCan.style.backgroundColor = 'red';

                // Pergunta se quer deletar o conteúdo
                if (confirm("Você deseja deletar o conteúdo?")) {
                    element.remove();
                    trashCan.style.backgroundColor = '#fff';
                    trashCan.style.display = 'none';
                }
            } else {
                trashCan.style.backgroundColor = '#fff';
            }
        }
    });

    document.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = "auto";
            trashCan.style.display = 'none';
        }
    });
}

