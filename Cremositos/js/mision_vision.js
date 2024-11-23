var acc = document.getElementsByClassName("boton1");
var rightAside = document.querySelector(".right"); // Selecciona el aside derecho

// Función para mostrar el contenido del panel
function showPanel(panel) {
    rightAside.innerHTML = panel.innerHTML;
}

// Agregar evento a cada botón
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var panel = this.nextElementSibling; // El div .panel correspondiente al botón

        // Muestra el contenido del panel en el aside derecho
        showPanel(panel);

        // Opcional: añadir una clase activa al botón seleccionado
        for (var j = 0; j < acc.length; j++) {
            acc[j].classList.remove("active");
        }
        this.classList.add("active");
    });
}

// Mostrar el primer panel (misión) por defecto al cargar la página
if (acc.length > 0) {
    acc[0].classList.add("active"); // Agrega la clase activa al primer botón
    showPanel(acc[0].nextElementSibling); // Muestra el contenido del primer panel (misión)
}