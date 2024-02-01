document.addEventListener("DOMContentLoaded", function() {
    var btnToggleDarkMode = document.getElementById("btnToggleDarkMode");
    var body = document.body;
    var dropArea = document.getElementById("drop-area");

    btnToggleDarkMode.addEventListener("click", function() {
      
        body.classList.toggle("dark-mode");

        // Verifica se o modo escuro está ativado
        if (body.classList.contains("dark-mode")) {
            dropArea.style.background = "conic-gradient(from 90deg at 1px 1px, #0000 90deg, rgb(39, 39, 43) 0) 0 0/50px 50px";
        } else {
            dropArea.style.background = "";
        }

        btnToggleDarkMode.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });
});
