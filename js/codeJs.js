document.addEventListener("DOMContentLoaded", function () {
    var draggedElement;

    document.querySelectorAll(".sidebar-item").forEach(function (item) {
        item.draggable = true;
        item.addEventListener("dragstart", function (event) {
            draggedElement = event.target.id;
        });
    });

    var dropArea = document.getElementById("drop-area");

    dropArea.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    dropArea.addEventListener("drop", function (event) {
        event.preventDefault();

        var newDiv;

        if (draggedElement === "note") {
            newDiv = createNoteWindow("Double click");
        } else if (draggedElement === "to-do") {
            newDiv = createToDoWindow("Double click");
        } else if (draggedElement === "draw") {
            newDiv = createDrawWindow("Double click");
        } else {
            // Handle other types...
        }

        newDiv.style.left = (event.clientX - dropArea.getBoundingClientRect().left - 50) + "px";
        newDiv.style.top = (event.clientY - dropArea.getBoundingClientRect().top - 15) + "px";

        dropArea.appendChild(newDiv);

        makeElementDraggable(newDiv);
    });

    dropArea.addEventListener("dragenter", function (event) {
        event.preventDefault();
    });

});
