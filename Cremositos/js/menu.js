 // Función para mostrar/ocultar el menú
 document.getElementById('menuIcon').addEventListener('click', function() {
    var menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
});

// Función para cerrar el menú si se hace clic fuera de él
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdownMenu');
    if (!event.target.matches('#menuIcon')) {
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
});

