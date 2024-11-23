// Recuperar el valor del costo total desde sessionStorage
const costoTotal = sessionStorage.getItem('costoTotalCompra');

// Mostrar el costo total en el elemento correspondiente
if (costoTotal) {
    const costoTotalElem = document.getElementById('costoTotal');
    if (costoTotalElem) {
        costoTotalElem.textContent = `$${costoTotal}`;
    }
}