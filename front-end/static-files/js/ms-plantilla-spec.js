/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const LISTADO_IMPRIMIR_MUCHAS_PERSONAS = "Listado de personas con todos los datos "
const LISTADO_IMPRIMIR_MUCHAS_PERSONAS_ALFABETICAMENTE="Listado de personas ordenadas alfabeticamente solo con su nombre"
const CEREAR = "cerear"
const LISTADO_NOMBRE_MUCHAS_PERSONAS ="Listado de personas solo con su nombre"
const LISTADO_UNA_PERSONA="Mostrar una persona"
const LISTADO_NOMBRE_MUCHAS_PERSONAS_TODOS_DATOS = "Listado de personas ordenadas alfabeticamente con todos sus datos"


const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const datosDescargadosPruebaPersona = {
    id: 1,
    nombre: "Harry",
    apellidos: "Potter",
    posicion: "buscador",
    fechaNacimiento: {
        dia: 16,
        mes: 12,
        annio: 1999
    },
    casaHogwarts: "Gryffindor",
    copasMundiales: [2009, 2011, 2013, 2015],
    tipoEscoba: "Nimbus"
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
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
           Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
           Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
           expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
           expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
           Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
          Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
          expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
           expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
            // Objeto sin campo fecha
           Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
           expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeFalse()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
          expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })

})

describe("Plantilla.imprimeMuchasPersonas: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.imprimeMuchasPersonas([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Plantilla.imprimeMuchasPersonas(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS)

        })
})

describe("Plantilla.imprimeOrdenadorAlfabeticamente: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.imprimeOrdenadorAlfabeticamente([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS_ALFABETICAMENTE)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Plantilla.imprimeOrdenadorAlfabeticamente(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_IMPRIMIR_MUCHAS_PERSONAS_ALFABETICAMENTE)

        })
})

describe("Plantilla.cerear: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.cerear()
            expect(Plantilla.cerear(5)).toBe("05");

        })

})

describe("Plantilla.imprimeNombreMuchasPersonas: ", function (){
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.imprimeNombreMuchasPersonas([])
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })
    it("muestra datos nulos cuando le pasamos un valor no nulo ",
        function () {
            Plantilla.imprimeNombreMuchasPersonas(15)
            expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS)

        })
})

describe("Plantilla.imprimeOrdenadorAlfabeticamenteTodosCampos", function() {
        it("muestra datos nulos cuando le pasamos un valor nulo",
            function () {
                Plantilla.imprimeOrdenadorAlfabeticamenteTodosCampos([])
                expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS_TODOS_DATOS)

            })
        it("muestra datos nulos cuando le pasamos un valor no nulo ",
            function () {
                Plantilla.imprimeOrdenadorAlfabeticamenteTodosCampos(15)
                expect(elementoTitulo.innerHTML).toBe(LISTADO_NOMBRE_MUCHAS_PERSONAS_TODOS_DATOS)

            })
    })

describe("Plantilla.recuperaJugadoBuscado", function(){
    it("devuelve un vector vacio cuando no se encuentra en jugador buscado", async function(){
        const callBackFn = function(resultado){
            expect(resultado).toEqual([]);
        }
        await Plantilla.recuperaJugadorBuscado("Jugador Inexistente",callBackFn);
    })
})

describe("Plantilla.habilitarDeshabilitarCamposEditables", function() {
    beforeEach(function() {
        // Crea un objeto de prueba con los campos de formulario
        Plantilla.form = {
            campo1: "campo1",
            campo2: "campo2",
            campo3: "campo3"
        };

        // Crea un objeto DOM de prueba
        var form = document.createElement("form");
        form.innerHTML = `
      <input id="campo1" />
      <input id="campo2" />
      <input id="campo3" />
    `;
        document.body.appendChild(form);
    });

    it("debe deshabilitar los campos editables cuando se llama con true", function() {
        // Llama a la función con true
        Plantilla.habilitarDeshabilitarCamposEditables(true);

        // Verifica que todos los campos de formulario están deshabilitados
        expect(document.getElementById("campo1").disabled).toEqual(true);
        expect(document.getElementById("campo2").disabled).toEqual(true);
        expect(document.getElementById("campo3").disabled).toEqual(true);
    });

    it("debe habilitar los campos editables cuando se llama con false", function() {
        // Llama a la función con false
        Plantilla.habilitarDeshabilitarCamposEditables(false);

        // Verifica que todos los campos de formulario están habilitados
        expect(document.getElementById("campo1").disabled).toEqual(false);
        expect(document.getElementById("campo2").disabled).toEqual(false);
        expect(document.getElementById("campo3").disabled).toEqual(false);
    });

    it("debe deshabilitar los campos editables cuando se llama sin argumentos", function() {
        // Llama a la función sin argumentos
        Plantilla.habilitarDeshabilitarCamposEditables();

        // Verifica que todos los campos de formulario están deshabilitados
        expect(document.getElementById("campo1").disabled).toEqual(true);
        expect(document.getElementById("campo2").disabled).toEqual(true);
        expect(document.getElementById("campo3").disabled).toEqual(true);
    });
});

describe("Plantilla.recuperaJugadorBuscado", function() {

    it("debería llamar al callback con el jugador encontrado", async function() {
        // Arrange
        const nombreBuscado = "Harry Potter";
        const vectorJugadores = {
            data: [
                { data: { nombre: "Ron Weasley" } },
                { data: { nombre: "Hermione Granger" } },
                { data: { nombre: "Harry Potter" } },
            ]
        };
        const fetchSpy = spyOn(window, "fetch").and.returnValue(Promise.resolve({
            json: () => Promise.resolve(vectorJugadores),
        }));
        const callBackSpy = jasmine.createSpy("callBackSpy");

        // Act
        await Plantilla.recuperaJugadorBuscado(nombreBuscado, callBackSpy);

        // Assert
        expect(fetchSpy).toHaveBeenCalledWith(Frontend.API_GATEWAY + "/Quidditch/getTodas");
        expect(callBackSpy).toHaveBeenCalledWith([{ data: { nombre: "Harry Potter" } }]);
    });

    it("debería mostrar un mensaje de error en caso de fallo en la conexión", async function() {
        // Arrange
        const nombreBuscado = "Harry Potter";
        const fetchSpy = spyOn(window, "fetch").and.returnValue(Promise.reject("Error de conexión"));
        const alertSpy = spyOn(window, "alert");
        const consoleSpy = spyOn(console, "error");
        const callBackSpy = jasmine.createSpy("callBackSpy");

        // Act
        await Plantilla.recuperaJugadorBuscado(nombreBuscado, callBackSpy);

        // Assert
        expect(fetchSpy).toHaveBeenCalledWith(Frontend.API_GATEWAY + "/Quidditch/getTodas");
        expect(callBackSpy).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith("Error: No se han podido acceder al API Gateway para recuperar Jugador Buscado");
        expect(consoleSpy).toHaveBeenCalledWith("Error de conexión");
    });

});
/*
describe('Plantilla.recuperaDatosAlmacenados', function() {
    it('should return the stored persona object', function() {
        const mockPersona = { id: 1, name: 'Harry Potter' };
        Plantilla.personaMostrada = mockPersona;

        const result = Plantilla.recuperaDatosAlmacenados();

        expect(result).toEqual(mockPersona);
    });
});

*/
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
