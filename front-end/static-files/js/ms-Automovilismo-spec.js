/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloAutomovilismo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoAutomovilismo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_AUTOMOVILISMO = "Plantilla Home"
const TITULO_ACERCA_DE_AUTOMOVILISMO = "Plantilla Acerca de"
const LISTADO_IMPRIMIR_MUCHAS_PERSONAS_AUTOMOVILISMO = "Listado de personas con todos los datos "

const datosDescargadosPruebaAutomovilismo = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Automovilismo.mostrarHome()
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_HOME_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML).toBe(Automovilismo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Automovilismo.mostrarHome(23)
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_HOME_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML).toBe(Automovilismo.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Automovilismo.mostrarHome({})
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_HOME_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML).toBe(Automovilismo.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Automovilismo.mostrarHome({ foo: "bar" })
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_HOME_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML).toBe(Automovilismo.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Automovilismo.mostrarHome(datosDescargadosPrAutomovilismo)
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_HOME_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML).toBe(datosDescargadosPruebaAutomovilismo.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Automovilismo.mostrarAcercaDe()
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Automovilismo.mostrarAcercaDe(23)
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Automovilismo.mostrarAcercaDe({})
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Automovilismo.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Automovilismo.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Automovilismo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Automovilismo.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloAutomovilismo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)
            expect(elementoContenidoAutomovilismo.innerHTML.search(Automovilismo.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Automovilismo.mostrarAcercaDe(datosDescargadosPruebaAutomovilismo)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE_AUTOMOVILISMO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoAutomovilismo.innerHTML.search(datosDescargadosPruebaAutomovilismo.autor) >= 0).toBeTrue()
            expect(elementoContenidoAutomovilismo.innerHTML.search(datosDescargadosPruebaAutomovilismo.email) >= 0).toBeTrue()
            expect(elementoContenidoAutomovilismo.innerHTML.search(datosDescargadosPruebaAutomovilismo.fecha) >= 0).toBeTrue()
        })
})



describe("Plantilla.imprimeMuchasPersonas: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Automovilismo.imprimeMuchasPersonas([])
            expect(elementoTituloAutomovilismo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS_AUTOMOVILISMO)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Automovilismo.imprimeMuchasPersonas(15)
            expect(elementoTituloAutomovilismo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS_AUTOMOVILISMO)

        })
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
