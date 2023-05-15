// historial.js

var historialGlobal = [];
var maximoHistorial = 10;

function registrarSeleccion(opcion) {
    historialGlobal.push(opcion);

    if (historialGlobal.length > maximoHistorial) {
        historialGlobal.shift();
    }

    actualizarHistorial();
}

function actualizarHistorial() {
    var historialDropdown = document.getElementById('historial-dropdown');
    historialDropdown.innerHTML = '';                     // Limpiar las opciones existentes

    historialGlobal
            .slice()
            .reverse()
            .forEach(function(opcion) {
                var enlace = document.createElement('a');
                enlace.href = 'javascript:void(0)';
                enlace.textContent = opcion;
                enlace.classList.add('opcion-');

                historialDropdown.appendChild(enlace);
            });
}
