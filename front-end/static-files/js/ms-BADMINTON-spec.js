/**
 * @file ms-Badminton-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Badminton en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloBadminton = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoBadminton = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_BADMINTON = "Badminton Home"
const TITULO_ACERCA_DE_BADMINTON = "Badminton Acerca de"
const LISTADO_NOMBRES_ORDENADOS = "Listado de personas solo con su nombre"
const LISTADO_NOMBRE= "Listado de personas"
const LISTADO_NOMBRE_TODAS = "Listado de  todas las personas"
const LISTADO_UNA= "Muestra una persona"


const datosDescargadosPruebaBadminton = {
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

describe("Badminton.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            BADMINTON.mostrarHome()
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_HOME_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML).toBe(BADMINTON.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            BADMINTON.mostrarHome(23)
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_HOME_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML).toBe(BADMINTON.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            BADMINTON.mostrarHome({})
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_HOME_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML).toBe(BADMINTON.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            BADMINTON.mostrarHome({ foo: "bar" })
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_HOME_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML).toBe(BADMINTON.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            BADMINTON.mostrarHome(datosDescargadosPruebaBadminton)
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_HOME_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML).toBe(datosDescargadosPruebaBadminton.mensaje)
        })
})


describe("Badminton.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            BADMINTON.mostrarAcercaDe()
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            BADMINTON.mostrarAcercaDe(23)
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            BADMINTON.mostrarAcercaDe({})
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            BADMINTON.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            BADMINTON.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            BADMINTON.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            BADMINTON.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)
            expect(elementoContenidoBadminton.innerHTML.search(BADMINTON.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            BADMINTON.mostrarAcercaDe(datosDescargadosPruebaBadminton)
            expect(elementoTituloBadminton.innerHTML).toBe(TITULO_ACERCA_DE_BADMINTON)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoBadminton.innerHTML.search(datosDescargadosPruebaBadminton.autor) >= 0).toBeTrue()
            expect(elementoContenidoBadminton.innerHTML.search(datosDescargadosPruebaBadminton.email) >= 0).toBeTrue()
            expect(elementoContenidoBadminton.innerHTML.search(datosDescargadosPruebaBadminton.fecha) >= 0).toBeTrue()
        })
})

describe ("Badminton.ordenaCampos", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        BADMINTON.ordenaCampos([])
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })

    /** 
    it("Si le pasamos datos nulos, devuelve datos nulos",
    function(){
        Badminton.ordenaCampos(10)
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })
    */
})
describe ("Badminton.ordenaNombre", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        BADMINTON.ordenaNombre([])
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })

    /** 
    it("Si le pasamos datos nulos, devuelve datos nulos",
    function(){
        Badminton.ordenaCampos(10)
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRES_ORDENADOS)
    })
    */
})
describe ("Badminton.imprimeTodasPersonas", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        BADMINTON.imprimeTodasPersonas([])
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRE_TODAS)
    })
})
describe ("Badminton.imprimePersonas", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        BADMINTON.imprimePersonas([])
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_NOMBRE)
    })
})
/** 
describe ("Badminton.imprimeUna", function(){
    it("si le pasamos un valor nulo muestra los datos nulos",
    function (){
        Badminton.imprimeUna(null)
        expect(elementoTituloBadminton.innerHTML).toBe(LISTADO_UNA)
    })
})
*/





/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Badminton.descargarRuta
 - Badminton.procesarAcercaDe
 - Badminton.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
