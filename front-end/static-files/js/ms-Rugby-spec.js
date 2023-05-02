/**
 * @file ms-Rugby-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Rugby en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Rugby Home"
const TITULO_ACERCA_DE = "Rugby Acerca de"
const LISTADO_IMPRIMIR_MUCHAS_PERSONAS = "Listado de personas con todos los datos "
const LISTADO_IMPRIMIR_MUCHAS_PERSONAS_ALFABETICAMENTE="Listado de personas ordenadas alfabeticamente solo con su nombre"
const LISTADO_NOMBRE_MUCHAS_PERSONAS ="Listado de personas solo con su nombre"
const LISTADO_UNA_PERSONA="Mostrar una persona"
const CREAR = "CREAR"


const datosDescargadosPrueba = {
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

const datosDescargadosPruebaPersona = {
    id: 2,
    nombre: "Alvaro",
    apellidos: "Expósito Carrillo",
    fecha: {
        day: 12,
        month: 7,
        year: 20001
    },
    equipo: "JienensesRC",
    historialEquipos: ["JienensesRC",
    "CordobesesRC"],
    peso: "83",
    altura: "195",
    posicion: "zaguero",
    zona: "back",
    numTrakles: "11"
}

// SPECS a probar

describe("Rugby.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Rugby.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Rugby.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Rugby.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Rugby.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Rugby.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Rugby.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Rugby.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Rugby.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Rugby.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Rugby.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Rugby.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Rugby.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Rugby.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Rugby.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
            // Objeto sin campo fecha
            Rugby.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Rugby.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Rugby.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Rugby.imprimeMuchasPersonas2: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.imprimeMuchasPersonas2([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Rugby.imprimeMuchasPersonas2(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })

})

describe("Rugby.crear: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.crear()
            expect(Rugby.crear(7)).toBe("07");

        })

})

describe("Rugby.listaAlfabeticamente: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.listaAlfabeticamente([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })
   /* it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Rugby.listaAlfabeticamente(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS_ALFABETICAMENTE)

        })*/
})

describe("Rugby.imprimeMuchasPersonas: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.imprimeMuchasPersonas([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Rugby.imprimeMuchasPersonas(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS)

        })
    
})

describe("Rugby.soloNombresAlfabeticamente: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Rugby.soloNombresAlfabeticamente([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })
   
})




/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Rugby.descargarRuta
 - Rugby.procesarAcercaDe
 - Rugby.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
