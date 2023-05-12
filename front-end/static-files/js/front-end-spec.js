/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar to do lo relacionado con MS Quidditch en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article) 
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})

describe("Frontend.Article.mostrar", function() {


    it("should remove the Frontend.CLASS_OCULTAR class from the HTML element", function() {
        let element = document.createElement("div");
        element.classList.add(Frontend.CLASS_OCULTAR);
        spyOn(document, "getElementById").and.returnValue(element);
        Frontend.Article.mostrar();
        expect(element.classList.contains(Frontend.CLASS_OCULTAR)).toBe(false);
    });

    it("should add the Frontend.CLASS_MOSTRAR class to the HTML element", function() {
        let element = document.createElement("div");
        spyOn(document, "getElementById").and.returnValue(element);
        Frontend.Article.mostrar();
        expect(element.classList.contains(Frontend.CLASS_MOSTRAR)).toBe(true);
    });
});

describe("Frontend.aniadirClase", function() {
    let element;
    beforeEach(function() {
        element = document.createElement("div");
        element.setAttribute("id", "testElement");
        document.body.appendChild(element);
    });

    afterEach(function() {
        document.body.removeChild(element);
        element = null;
    });

    it("should add a class to the HTML element", function() {
        Frontend.aniadirClase(element, "testClass");
        expect(element.classList.contains("testClass")).toBe(true);
    });

    it("should not add the same class twice to the HTML element", function() {
        element.classList.add("testClass");
        Frontend.aniadirClase(element, "testClass");
        let classList = element.getAttribute("class").split(" ");
        let count = 0;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i] === "testClass") {
                count++;
            }
        }
        expect(count).toBe(1);
    });

    it("should get the HTML element by ID if the first parameter is a string", function() {
        spyOn(document, "getElementById").and.callThrough();
        Frontend.aniadirClase("testElement", "testClass");
        expect(document.getElementById).toHaveBeenCalledWith("testElement");
    });

    it("should return the 'this' object", function() {
        let result = Frontend.aniadirClase(element, "testClass");
        expect(result).toBe(Frontend);
    });
});

describe("Frontend.quitarClase", function() {
    it("debería quitar la clase indicada del elemento", function() {
        // Creamos el elemento y le agregamos una clase
        const elemento = document.createElement("div");
        elemento.classList.add("clase1");

        // Ejecutamos la función para quitar la clase
        Frontend.quitarClase(elemento, "clase1");

        // Comprobamos que la clase fue eliminada
        expect(elemento.classList.contains("clase1")).toBeFalsy();
    });

});/*
describe("Frontend.TodosNombresOrdenados: ", function () {
    it("muestra todos los nombres de los jugadores de todos los deportes ordenados alfabéticamente",
        function () {

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores")
            expect(elementoContenido.innerHTML.includes("Nombres Quidditch")).toBeTrue() 
            expect(elementoContenido.innerHTML.includes("Nombres Rugby")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombres Badminton")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombres Automovilismo")).toBeTrue()
        })
})
*/
/*
describe("Frontend.FusionVec: ", function () {
    it("muestra todos los nombres de los jugadores de todos los deportes ordenados alfabéticamente",
        function () {
        //  let personas = .datos_personas
        //    Frontend.FusionVec(personas)

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores/equipos ordenados:")
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
            }
        })
})
*/


