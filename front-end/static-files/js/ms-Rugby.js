/**
 * @file Rugby.js
 * @description Funciones para el procesamiento de la info enviada por el MS Rugby
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Rugby = {};

/// Rugby para poner los datos de varias personas dentro de una tabla
Rugby.plantillaTablaPersonas = {}

// Rugby de datosDescargados vacíos
Rugby.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Álvaro Expósito Carrillo",
    email: "aec00028@red.ujaen.es",
    fecha: "28/03/2023"
}

// Tags que voy a usar para sustituir los campos
Rugby.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FECHA": "### FECHA ###",
    "EQUIPO": "### EQUIPO ###",
    "PESO": "### PESO ###",
    "ALTURA": "### ALTURA ###",
    "POSICION": "### POSICION ###",
    "NUMTRAKLES": "### NUMTRAKLES ###",
    "HISTORIAL": "### HISTORIAL ###",
    "ZONA": "### ZONA ###"

    
}

Rugby.crear = function ( num ) {
    return (num<10?"0":"")+num
}

// Cabecera de la tabla
Rugby.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">ID</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="20%">Fecha Nacimiento</th>
                        <th width="20%">Equipo</th>
                        <th width="20%">Peso</th>
                        <th width="20%">Altura</th>
                        <th width="20%">Posicion</th>
                        <th width="20%">Numero de Trakles</th>
                        <th width="20%">Historial de equipos</th>
                        <th width="20%">Zona</th>
                    </thead>
                    <tbody>
    `;

// Pie de la tabla
Rugby.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;



Rugby.plantillaTablaPersonas.cabecera3 = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                    </thead>
                    <tbody>
    `;

// Pie de la tabla
Rugby.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Función que descarga la info MS Rugby al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Rugby.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Rugby
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Rugby
 */
Rugby.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Rugby Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Rugby
 */
Rugby.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
    <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
    <li><b>E-mail</b>: ${datosDescargados.email}</li>
    <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Rugby Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Rugby.procesarHome = function () {
    this.descargarRuta("/Rugby/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Rugby.procesarAcercaDe = function () {
    this.descargarRuta("/Rugby/acercade", this.mostrarAcercaDe);
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */




Rugby.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Rugby.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Rugby.plantillaTablaPersonas.actualiza(e))
    }
    msj += Rugby.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)
}


Rugby.imprimeMuchasPersonas2 = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Rugby.plantillaTablaPersonas.cabecera3//solo una pers
    if (vector && Array.isArray(vector)) {
    vector.forEach(e => msj += Rugby.plantillaTablaPersonas.actualiza2(e))
    }
    msj += Rugby.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
}
/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Rugby.plantillaTablaPersonas.actualiza = function (persona) {
    return Rugby.sustituyeTags(this.cuerpo, persona)
}

Rugby.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Rugby.sustituyeTags2(this.cuerpo2, persona)
}

//Funcion para ordenar Alfabeticamente los campos de la BBDD usando con la funcion Sort
Rugby.listaAlfabeticamente = function(vector,campo){
    vector.sort(function(a,b)
     {
         let campoA = null; 
         let campoB = null;  
         if(campo == 'fecha'){
             campoA = a.data[campo].year + "" +  Rugby.crear(a.data[campo].month) + ""+ Rugby.crear(a.data[campo].day)
             campoB = b.data[campo].year + "" +   Rugby.crear(b.data[campo].month) + ""+ Rugby.crear(b.data[campo].day)
         }else{
             campoA = a.data[campo].toUpperCase();
             campoB = b.data[campo].toUpperCase();
         }
             if (campoA < campoB) {
                 return -1;
             }
             if (campoA > campoB) {
                 return 1;
             }
             return 0;
     });
  
 
         // Compongo el contenido que se va a mostrar dentro de la tabla
         let msj = Rugby.plantillaTablaPersonas.cabecera
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += Rugby.plantillaTablaPersonas.actualiza(e))
     }
         msj += Rugby.plantillaTablaPersonas.pie
         // Para comprobar lo que hay en vector
         // Borro toda la info de Article y la sustituyo por la que me interesa
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
 
 }

 Rugby.soloNombresAlfabeticamente = function(vector,campo){
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
  
 
         // Compongo el contenido que se va a mostrar dentro de la tabla
         let msj = Rugby.plantillaTablaPersonas.cabecera3
     if (vector && Array.isArray(vector)) {
         vector.forEach(e => msj += Rugby.plantillaTablaPersonas.actualiza2(e))
     }
         msj += Rugby.plantillaTablaPersonas.pie
         // Para comprobar lo que hay en vector
         // Borro toda la info de Article y la sustituyo por la que me interesa
         Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
 
 }

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Rugby Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Rugby.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Rugby.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Rugby.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Rugby.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Rugby.plantillaTags.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Rugby.plantillaTags.FECHA, 'g'), persona.data.fecha.day + "-" + persona.data.fecha.month + "-" + persona.data.fecha.year)
        .replace(new RegExp(Rugby.plantillaTags.EQUIPO, 'g'), persona.data.equipo)
        .replace(new RegExp(Rugby.plantillaTags.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Rugby.plantillaTags.ALTURA, 'g'), persona.data.altura)
        .replace(new RegExp(Rugby.plantillaTags.NUMTRAKLES, 'g'), persona.data.numTrakles)
        .replace(new RegExp(Rugby.plantillaTags.HISTORIAL, 'g'), persona.data.historialEquipos)
        .replace(new RegExp(Rugby.plantillaTags.ZONA, 'g'), persona.data.zona)
       
}

Rugby.sustituyeTags2 = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Rugby.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
}
/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Rugby.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Rugby/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data,campo)
    }
}

Rugby.recuperaHU09 = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Rugby/getTodas"
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
        callBackFn(vectorPersonas.data,"Rugby")

    }
}
/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Rugby.listar = function () {
    Rugby.recupera(Rugby.imprimeMuchasPersonas);
}

Rugby.listar2 = function () {
    Rugby.recupera(Rugby.imprimeMuchasPersonas2);
    
}

Rugby.listar4 = function (campo) {
    Rugby.recupera(Rugby.soloNombresAlfabeticamente,campo);
    
}

Rugby.listar3 = function (campo) {
    Rugby.recupera(Rugby.listaAlfabeticamente,campo);
}

Rugby.personaComoFormulario = function (persona) {
    return Rugby.plantillaFormularioPersona.actualiza( persona );
}
Rugby.plantillaFormularioPersona = {}

Rugby.l
// Elemento TR que muestra los datos de una persona
Rugby.plantillaTablaPersonas.cuerpo = `
    <tr title="${Rugby.plantillaTags.ID}">
        <td>${Rugby.plantillaTags.ID}</td>
        <td>${Rugby.plantillaTags.NOMBRE}</td>
        <td>${Rugby.plantillaTags.APELLIDOS}</td>
        <td>${Rugby.plantillaTags.FECHA}</td>
        <td>${Rugby.plantillaTags.EQUIPO}</td>
        <td>${Rugby.plantillaTags.PESO}</td>
        <td>${Rugby.plantillaTags.ALTURA}</td>
        <td>${Rugby.plantillaTags.POSICION}</td>
        <td>${Rugby.plantillaTags.NUMTRAKLES}</td>
        <td>${Rugby.plantillaTags.HISTORIAL}</td>
        <td>${Rugby.plantillaTags.ZONA}</td>
        <td>
                    <div><a href="javascript:Rugby.mostrar('${Rugby.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Rugby.plantillaTablaPersonas.cuerpo2 = `
    <tr title="${Rugby.plantillaTags.ID}">
      
        <td>${Rugby.plantillaTags.NOMBRE}</td>
      
       <td>
            <div><a href="javascript:Personas.mostrar('${Rugby.plantillaTags.ID}')" class="opcion-secundaria mostrar"></a></div>
        </td>
        </tr>
    `;
    Rugby.personaMostrada = null
    
    

    Rugby.mostrar = function (nombre) {
        this.recuperaUnaPersona(nombre, this.imprimeUnaPersona);
    }
    /**
     * Función que recuperar todas las personas llamando al MS Personas.
     * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
     * @param {String} idPersona Identificador de la persona a mostrar
     * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
     */
    Rugby.recuperaUnaPersona = async function (nombre, callBackFn) {
        try {
            const url = Frontend.API_GATEWAY + "/Rugby/listarUna/" + nombre
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
    
    /**
     * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
     * @param {Persona} persona Datos de la persona a mostrar
     */
    
    Rugby.imprimeUnaPersona = function (persona) {
        // console.log(persona) // Para comprobar lo que hay en vector
        let msj = Rugby.personaComoFormulario(persona);
    
        // Borro toda la info de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizar("Mostrar una persona", msj)
    
        // Actualiza el objeto que guarda los datos mostrados
        Rugby.almacenaDatos(persona)
    }
    
    /**
     * Almacena los datos de la persona que se está mostrando
     * @param {Persona} persona Datos de la persona a almacenar
     */
    
    Rugby.almacenaDatos = function (persona) {
        Rugby.personaMostrada = persona;
    }