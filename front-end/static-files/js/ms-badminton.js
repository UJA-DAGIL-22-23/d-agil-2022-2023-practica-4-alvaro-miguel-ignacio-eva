/**
 * @file Badminton.js
 * @description Funciones para el procesamiento de la info enviada por el MS Badminton
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Badminton = {};


Badminton.plantillaPersonas = {}

Badminton.personaMostrada = null

// Badminton de datosDescargados vacíos
Badminton.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Miguel Angel Carrasco Infante",
    email: "maci0002@red.ujaen.es",
    fecha: "13/08/01"
}

// Tags que voy a usar para sustituir los campos
Badminton.plantillaTags = {
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",

}
Badminton.plantillaTagsTodos = {
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
Badminton.descargarRuta = async function (ruta, callBackFn) {
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
Badminton.mostrarHome = function (datosDescargados) {
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
Badminton.mostrarAcercaDe = function (datosDescargados) {
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

Badminton.imprimePersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Badminton.plantillaPersonas.cabecera
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += Badminton.plantillaPersonas.actualiza(e))
    msj += Badminton.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

Badminton.imprimeTodasPersonas = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Badminton.plantillaPersonas.cabeceraTodos
    if (vector && Array.isArray(vector)) 
        vector.forEach(e => msj += Badminton.plantillaPersonas.actualizaTodos(e))
    msj += Badminton.plantillaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de  todas las personas", msj)
}

Badminton.ordenaCampos = function(vector,campo){
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
     let msj = Badminton.plantillaPersonas.cabecera
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += Badminton.plantillaPersonas.actualizaTodos(e))
     }
     msj += Badminton.plantillaPersonas.pie
     Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
    }
    Badminton.ordenaNombre = function(vector,nombre){
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
         let msj = Badminton.plantillaPersonas.cabecera
         if (vector && Array.isArray(vector)) {
             vector.forEach(e => msj += Badminton.plantillaPersonas.actualiza(e))
         }
         msj += Badminton.plantillaPersonas.pie
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
        }
    

     


//Funciones para crear una table
//Funcion para crear la cabecera de una table
Badminton.plantillaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        

                  

                    </thead>
                    <tbody>
    `;
    Badminton.plantillaPersonas.cabeceraTodos = `<table width="100%" class="listado-personas">
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
Badminton.plantillaPersonas.pie = `        </tbody>
    </table>
    `;

//Cuerpo de la tabla
Badminton.plantillaPersonas.cuerpo = `
    <tr title="${Badminton.plantillaTags.NOMBRE}">
        <td>${Badminton.plantillaTags.NOMBRE}</td>
        <td>${Badminton.plantillaTags.APELLIDOS}</td>
        <td>
    </tr>
    `;
    Badminton.plantillaPersonas.cuerpoTodas = `
    <tr title="${Badminton.plantillaTagsTodos.NOMBRE}">
        <td>${Badminton.plantillaTagsTodos.NOMBRE}</td>
        <td>${Badminton.plantillaTagsTodos.APELLIDOS}</td>
        <td>${Badminton.plantillaTagsTodos.fechaNacimiento}</td>
        <td>${Badminton.plantillaTagsTodos.DIRECCION}</td> 
        <td>${Badminton.plantillaTagsTodos.PESO}</td>
        <td>${Badminton.plantillaTagsTodos.ALTURA}</td>
        <td>${Badminton.plantillaTagsTodos.manoDominante}</td>
        <td>${Badminton.plantillaTagsTodos.clubActual}</td>
        <td>${Badminton.plantillaTagsTodos.nTorneosGanados}</td>
        <td>${Badminton.plantillaTagsTodos.nTorneosjugados}</td>
        <td>
    </tr>
    `;


/** 
* Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
* @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
* @returns La plantilla del cuerpo de la tabla con los datos actualizados
*/
Badminton.plantillaPersonas.actualiza = function (persona) {
   return Badminton.sustituyeTags(this.cuerpo, persona)
}

Badminton.plantillaPersonas.actualizaTodos = function (persona) {
    return Badminton.sustituyeTagsTodos(this.cuerpoTodas, persona)
 }

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Badminton Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Badminton.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Badminton.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Badminton.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Badminton.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)



}

Badminton.sustituyeTagsTodos = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Badminton.plantillaTagsTodos.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Badminton.plantillaTagsTodos.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Badminton.plantillaTagsTodos.fechaNacimiento, 'g'), persona.data.fechaNacimiento)        
        .replace(new RegExp(Badminton.plantillaTagsTodos.DIRECCION, 'g'), persona.data.direccion)
        .replace(new RegExp(Badminton.plantillaTagsTodos.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Badminton.plantillaTagsTodos.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(Badminton.plantillaTagsTodos.manoDominante, 'g'), persona.data.manoDominante)
        .replace(new RegExp(Badminton.plantillaTagsTodos.clubActual, 'g'), persona.data.clubActual)
        .replace(new RegExp(Badminton.plantillaTagsTodos.nTorneosGanados, 'g'), persona.data.nTorneosGanados)
        .replace(new RegExp(Badminton.plantillaTagsTodos.nTorneosjugados, 'g'), persona.data.nTorneosJugados)
}


/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Badminton.recupera = async function (callBackFn) {
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
Badminton.recuperaTodos = async function (callBackFn, campo) {
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

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data, campo)
    }
}
Badminton.recuperaUna = async function (nombre, callBackFn) {
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

Badminton.personaTabla = function (persona){
    return Badminton.plantillaPersonas.cabeceraTodos
    + Badminton.plantillaPersonas.actualizaTodos(persona)
    + Badminton.plantillaPersonas.pie;
}

Badminton.imprimeUna = function (persona){
    if(persona!=null){
        let msj = Badminton.personaTabla(persona)
        Frontend.Article.actualizar("Muestra una persona", msj)
        Badminton.almacenaUna(persona)
    }
}
Badminton.almacenaUna = function (persona) {
    Badminton.personaMostrada = persona;
}
Badminton.mostrar = function (nombre){
    this.recuperaUna(nombre, this.imprimeUna)
}



/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Badminton.procesarHome = function () {
    this.descargarRuta("/BADMINTON/", this.mostrarHome);
}

Badminton.procesarListarNombres = function (){
    Badminton.recupera(Badminton.imprimePersonas);
}

Badminton.procesarListarTodos = function (){
    Badminton.recupera(Badminton.imprimeTodasPersonas);
}

Badminton.procesarCampoOrdenado = function (campo){
    Badminton.recuperaTodos(Badminton.ordenaCampos, campo);
}

Badminton.procesarOrdenadoAlfabeticamente = function (nombre){
    Badminton.recuperaTodos(Badminton.ordenaNombre, nombre);
}



/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Badminton.procesarAcercaDe = function () {
    this.descargarRuta("/BADMINTON/acercade", this.mostrarAcercaDe);
}



