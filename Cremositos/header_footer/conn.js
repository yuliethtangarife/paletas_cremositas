
fetch('../Cremositos/header_footer/header/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        // Cargar el script del menú después de que el encabezado se haya insertado
        var script = document.createElement('script');
        script.src = 'js/menu.js';
        document.body.appendChild(script);
    });

fetch('../Cremositos/header_footer/footer/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data);

