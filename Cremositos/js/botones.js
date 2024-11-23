function login(){
    window.location.href = "login.html";
}
function siguiente() {
    window.location.href = "Pedido.html";
}

function irCatalogo() {
    if (localStorage.getItem('ingresoComoInvitado') === 'true' && localStorage.getItem('formularioMostrado') === 'false') {
        alert('Por favor llena el formulario con tus datos para tenerlos presente para realizar el domicilio');
        window.location.href = "/Cremositos/formulario.html";  
        localStorage.setItem('formularioMostrado', 'true'); // Marca que el formulario ya ha sido mostrado
    } else {
        window.location.href = "catalogo.html"; 
    }
}
function enviarForm(){
    document.forms[0].submit();  // Envía el primer formulario de la página
}

function validarFormulario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var celular = document.getElementById("celular").value;
    var direccion = document.getElementById("direccion").value;
    var ubicacion = document.getElementById("ubicacion").value;

        // Verificar si alguno de los campos está vacío
        if (nombre === "" || celular === "" || direccion === "" || ubicacion === "") {
            alert("Todos los campos son obligatorios.");
            return false;
        }

    
    window.location.href = "catalogo.html";
    return false;
}
function incrementarCantidad(nombreProducto, idCantidad, precio) {
    // Obtener el campo de entrada de cantidad correspondiente
    let cantidadInput = document.getElementById(idCantidad);

    // Verificar que el valor de la cantidad sea un número válido
    let cantidad = parseInt(cantidadInput.value);
    if (isNaN(cantidad) || cantidad <= 0) {
        cantidad = 0; // Si la cantidad no es válida, ponerla a 0
    }

    // Incrementar el valor de la cantidad
    cantidadInput.value = cantidad + 1;

    // Llamar a la función AggProducto con el nombre, cantidad y precio actualizados
    AggProducto(nombreProducto, idCantidad, precio);
}

function AggProducto(nombreProducto, idCantidad, precio) {
    // Obtener la cantidad del producto
    const cantidadInput = document.getElementById(idCantidad);
    let cantidad = parseInt(cantidadInput.value);

    // Validar que la cantidad sea un número válido y mayor que cero
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor ingresa una cantidad válida.');
        return;
    }

    // Crear el objeto del producto
    const producto = {
        nombre: nombreProducto,
        cantidad: cantidad,
        precio: precio
    };

    // Obtener el carrito de sesión
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Comprobar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.nombre === nombreProducto);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si el producto no está en el carrito, agregarlo
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}


window.onload = function() {
    // Obtener el carrito de sessionStorage
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Crear un objeto para agrupar los productos por nombre
    let productosAgrupados = {};

    // Agrupar los productos por sabor
    carrito.forEach(producto => {
        if (productosAgrupados[producto.nombre]) {
            // Si ya existe el producto, sumamos la cantidad
            productosAgrupados[producto.nombre].cantidad += producto.cantidad;
        } else {
            // Si no existe, lo agregamos y nos aseguramos de que el precio sea numérico
            productosAgrupados[producto.nombre] = {
                ...producto,
                precioUnitario: parseFloat(producto.precio) || 0  // Asegurarse de que el precio sea numérico
            };
        }
    });

    // Seleccionar el cuerpo de la tabla y el costo total
    const carritoBody = document.getElementById('carritoBody');
    const costoTotalElem = document.getElementById('costoTotal');

    // Función para actualizar el costo total
    function actualizarCostoTotal() {
        let total = 0;
        for (let nombre in productosAgrupados) {
            total += productosAgrupados[nombre].cantidad * productosAgrupados[nombre].precioUnitario;
        }
        costoTotalElem.textContent = `$${total.toFixed(2)}`;
    
        // Guardar el total en sessionStorage
        sessionStorage.setItem('costoTotalCompra', total.toFixed(2));
    }

    // Recorrer el objeto de productos agrupados y agregar cada producto como una fila en la tabla
    for (let nombre in productosAgrupados) {
        let producto = productosAgrupados[nombre];
        
        // Crear la fila con un campo de entrada para editar la cantidad
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td><input type="number" value="${producto.cantidad}" min="1" class="cantidadInput" data-nombre="${producto.nombre}"></td>
            <td class="precioTotal">$${(producto.cantidad * producto.precioUnitario).toFixed(2)}</td>
        `;
        carritoBody.appendChild(row);
    }

    // Evento para actualizar la cantidad y el costo total
    carritoBody.addEventListener('input', function(event) {
        if (event.target.classList.contains('cantidadInput')) {
            const nombre = event.target.getAttribute('data-nombre');
            const nuevaCantidad = parseInt(event.target.value);
            
            // Actualizar la cantidad en el producto agrupado
            productosAgrupados[nombre].cantidad = nuevaCantidad;
            
            // Actualizar el precio total en la fila
            const precioTotalElem = event.target.closest('tr').querySelector('.precioTotal');
            precioTotalElem.textContent = `$${(nuevaCantidad * productosAgrupados[nombre].precioUnitario).toFixed(2)}`;
            
            // Actualizar el costo total
            actualizarCostoTotal();
        }
    });

    // Inicializar el costo total al cargar
    actualizarCostoTotal();
};

function GuardarCompra() {
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    let ventasGuardadas = JSON.parse(localStorage.getItem('ventasGuardadas')) || [];

    // Obtener el comprobante (asumiendo que ya lo has guardado en el carrito o el comprobante es parte de la compra)
    const fileInput = document.getElementById('comprobante');
    const file = fileInput ? fileInput.files[0] : null;

    if (file) {
        // Guardar el comprobante en el carrito
        const reader = new FileReader();
        reader.onload = function (e) {
            const blob = new Blob([e.target.result], { type: file.type });
            const url = "ComprobantePago/PlantillaComprobante.pdf";

            // Agregar el comprobante a cada producto del carrito
            carrito.forEach(producto => {
                producto.comprobanteUrl = url;  // Asignamos el URL del comprobante al carrito
            });

            // Agregar la fecha de la compra al carrito
            const fechaActual = new Date().toISOString();
            carrito.forEach(producto => {
                producto.fechaCompra = fechaActual;
            });

            // Aquí añadimos los datos del carrito con el comprobante y la fecha a las ventas guardadas
            ventasGuardadas.push(carrito);

            // Guardar las ventas en localStorage
            localStorage.setItem('ventasGuardadas', JSON.stringify(ventasGuardadas));

            // Limpiar el carrito después de guardar
            sessionStorage.removeItem('carrito');

            // Mostrar un mensaje de éxito
            alert('Compra guardada exitosamente');

            // Redirigir a la página del perfil
            window.location.href = "perfilUsrio.html";
        };

        // Leer el archivo seleccionado y convertirlo a un Blob
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, selecciona un comprobante antes de guardar la compra.');
    }
}

function Comprar(){
    window.location.href = "Compra.html"; 
}



