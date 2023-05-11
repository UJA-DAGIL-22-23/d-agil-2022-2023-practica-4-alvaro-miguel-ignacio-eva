/**
 * @file Badminton.js
 * @description Funciones para el procesamiento de la info enviada por el MS Badminton
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let BADMINTON = {};


BADMINTON.plantillaPersonas = {}

BADMINTON.personaMostrada = null

// Badminton de datosDescargados vacíos
BADMINTON.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Miguel Angel Carrasco Infante",
    email: "maci0002@red.ujaen.es",
    fecha: "13/08/01"
}

// Tags que voy a usar para sustituir los campos
BADMINTON.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",

}
BADMINTON.plantillaTagsTodos = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "fechaNacimiento": "### fechaNacimiento ###",
    "DIRECCION" : "### DIRECCION ###",
    "PESO" : "### PESO ###",
    "ALTURA" : "### ALTURA ###",
    "manoDominante" : "###  manoDominante ###",
    "clubActual" : "### clubActual ###",
    "nTorneosGanados" : "### nTorneosGanados ###",
    "nTorneosjugados" : "### nTorneosjugados ###"

}



/**
 * Función que descarga la info MS Badminton al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
BADMINTON.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Badminton
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Badminton
 */
BADMINTON.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Badminton Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Badminton
 */
BADMINTON.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos
    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos
    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos
    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Mensaje/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Badminton Acerca de", mensajeAMostrar)
}




/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

BADMINTON.imprimePersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = BADMINTON.plantillaPersonas.cabecera
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += BADMINTON.plantillaPersonas.actualiza(e))
    msj += BADMINTON.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

BADMINTON.imprimeTodasPersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = BADMINTON.plantillaPersonas.cabeceraTodos
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += BADMINTON.plantillaPersonas.actualizaTodos(e))
    msj += BADMINTON.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de  todas las personas", msj)
}

BADMINTON.ordenaCampos = function(vector, campo){
    vector.sort(function(a,b)
     {
         let campoA = null; 
         let campoB = null;  
         
             campoA = a.data[campo].toUpperCase();
             campoB = b.data[campo].toUpperCase();
         
             if (campoA < campoB) {
                 return -1;
             }
             if (campoA > campoB) {
                 return 1;
             }
             return 0;
     });
     let msj = BADMINTON.plantillaPersonas.cabecera
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += BADMINTON.plantillaPersonas.actualizaTodos(e))
     }
     msj += BADMINTON.plantillaPersonas.pie
     Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
    }
    BADMINTON.ordenaNombre = function(vector, nombre){
        vector.sort(function(a,b)
         {
             let nombreA = null; 
             let nombreB = null;  
             
                 nombreA = a.data[nombre].toUpperCase();
                 nombreB = b.data[nombre].toUpperCase();
             
                 if (nombreA < nombreB) {
                     return -1;
                 }
                 if (nombreA > nombreB) {
                     return 1;
                 }
                 return 0;
         });
         let msj = BADMINTON.plantillaPersonas.cabecera
         if (vector && Array.isArray(vector)) {
             vector.forEach(e => msj += BADMINTON.plantillaPersonas.actualiza(e))
         }
         msj += BADMINTON.plantillaPersonas.pie
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
        }
    

     


//Funciones para crear una table
//Funcion para crear la cabecera de una table
BADMINTON.plantillaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        

                  

                    </thead>
                    <tbody>
    `;
    BADMINTON.plantillaPersonas.cabeceraTodos = `<table width="100%" class="listado-personas">
    <thead>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="20%">F_nacimiento</th>
        <th width="20%">Direccion </th>
        <th width="20%">Peso</th>
        <th width="20%">Altura</th>
        <th width="20%">Mano dominante</th>
        <th width="20%">Club actual</th>
        <th width="20%">Número de torneos ganados</th>
        <th width="20%">Número de torneos jugados</th>


    </thead>
    <tbody>
`;
BADMINTON.plantillaPersonas.pie = `        </tbody>
    </table>
    `;

//Cuerpo de la tabla
BADMINTON.plantillaPersonas.cuerpo = `
    <tr title="${BADMINTON.plantillaTags.NOMBRE}">
        <td>${BADMINTON.plantillaTags.NOMBRE}</td>
        <td>${BADMINTON.plantillaTags.APELLIDOS}</td>
        <td>
    </tr>
    `;
    BADMINTON.plantillaPersonas.cuerpoTodas = `
    <tr title="${BADMINTON.plantillaTagsTodos.NOMBRE}">
        <td>${BADMINTON.plantillaTagsTodos.NOMBRE}</td>
        <td>${BADMINTON.plantillaTagsTodos.APELLIDOS}</td>
        <td>${BADMINTON.plantillaTagsTodos.fechaNacimiento}</td>
        <td>${BADMINTON.plantillaTagsTodos.DIRECCION}</td> 
        <td>${BADMINTON.plantillaTagsTodos.PESO}</td>
        <td>${BADMINTON.plantillaTagsTodos.ALTURA}</td>
        <td>${BADMINTON.plantillaTagsTodos.manoDominante}</td>
        <td>${BADMINTON.plantillaTagsTodos.clubActual}</td>
        <td>${BADMINTON.plantillaTagsTodos.nTorneosGanados}</td>
        <td>${BADMINTON.plantillaTagsTodos.nTorneosjugados}</td>
        <td>
    </tr>
    `;


/** 
* Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
* @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
* @returns La plantilla del cuerpo de la tabla con los datos actualizados
*/
BADMINTON.plantillaPersonas.actualiza = function (persona) {
   return BADMINTON.sustituyeTags(this.cuerpo, persona)
}

BADMINTON.plantillaPersonas.actualizaTodos = function (persona) {
    return BADMINTON.sustituyeTagsTodos(this.cuerpoTodas, persona)
 }

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Badminton Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
BADMINTON.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(BADMINTON.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(BADMINTON.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(BADMINTON.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)



}

BADMINTON.sustituyeTagsTodos = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.fechaNacimiento, 'g'), persona.data.fechaNacimiento)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.DIRECCION, 'g'), persona.data.direccion)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.manoDominante, 'g'), persona.data.manoDominante)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.clubActual, 'g'), persona.data.clubActual)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.nTorneosGanados, 'g'), persona.data.nTorneosGanados)
        .replace(new RegExp(BADMINTON.plantillaTagsTodos.nTorneosjugados, 'g'), persona.data.nTorneosJugados)
}


/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

BADMINTON.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/BADMINTON/listarPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}
BADMINTON.recuperaTodos = async function (callBackFn, campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/BADMINTON/listarPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data, campo)
    }
}
BADMINTON.recuperaUna = async function (nombre, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/BADMINTON/listarUna/" + nombre
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

BADMINTON.personaTabla = function (persona){
    return BADMINTON.plantillaPersonas.cabeceraTodos
    + BADMINTON.plantillaPersonas.actualizaTodos(persona)
    + BADMINTON.plantillaPersonas.pie;
}

BADMINTON.imprimeUna = function (persona){
    if(persona!=null){
        let msj = BADMINTON.personaTabla(persona)
        Frontend.Article.actualizar("Muestra una persona", msj)
        BADMINTON.almacenaUna(persona)
    }
}
BADMINTON.almacenaUna = function (persona) {
    BADMINTON.personaMostrada = persona;
}
BADMINTON.mostrar = function (nombre){
    this.recuperaUna(nombre, this.imprimeUna)
}



/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
BADMINTON.procesarHome = function () {
    this.descargarRuta("/BADMINTON/", this.mostrarHome);
}

BADMINTON.procesarListarNombres = function (){
    BADMINTON.recupera(BADMINTON.imprimePersonas);
}

BADMINTON.procesarListarTodos = function (){
    BADMINTON.recupera(BADMINTON.imprimeTodasPersonas);
}

BADMINTON.procesarCampoOrdenado = function (campo){
    BADMINTON.recuperaTodos(BADMINTON.ordenaCampos, campo);
}

BADMINTON.procesarOrdenadoAlfabeticamente = function (nombre){
    BADMINTON.recuperaTodos(BADMINTON.ordenaNombre, nombre);
}



/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
BADMINTON.procesarAcercaDe = function () {
    this.descargarRuta("/BADMINTON/acercade", this.mostrarAcercaDe);
}



BADMINTON.recuperaHU09 = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/BADMINTON/listarPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data,"BADMINTON")

    }
}