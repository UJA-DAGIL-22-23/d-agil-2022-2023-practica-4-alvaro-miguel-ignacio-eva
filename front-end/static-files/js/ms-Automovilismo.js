/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";



/// Creo el espacio de nombres
let Automovilismo = {};


// Plantilla de datosDescargados vacíos
Automovilismo.datosDescargadosNulos = {
    mensaje: "Microservicio MS Automovilismo: acerca de",
    autor: "Ignacio Cervilla Gomáriz",
    email: "icg000@red.ujaen.es",
    fecha: "24/04/2023"
}

Automovilismo.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "TIPO_COMBUSTIBLE": "### TIPO_COMBUSTIBLE ###",
    "COLOR": "### COLOR ###",
    "HP": "### HP ###",
    "VELOCIDAD_MAXIMA": "### VELOCIDAD_MAXIMA ###",
    "NUMERO": "### NUMERO ###",
    "FECHA_NACIMIENTO": "### FECHA_NACIMIENTO ###",
    "ANIOS_GANADOR":"### ANIOS_GANADOR ###",
    "COEFICIENTE_AERODINAMICO":"### COEFICIENTO_AERODINAMICO ###",
    "PATROCINADOR":"### PATROCINADOR ###"

}
Automovilismo.cerear = function ( num ) {
    return (num<10?"0":"")+num
}

Automovilismo.plantillaTablaPersonas = {}   //Plantilla para los datos de cada persona


Automovilismo.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Nombre</th>
                        <th width="10%">Tipo_Combustible</th>
                        <th width="10%">Color</th>
                        <th width="10%">HP</th>
                        <th width="20%">Velocidad_Maxima</th>
                        <th width="20%">Fecha_Nacimiento</th>
                        <th width="10%">Anios_Ganador</th>
                        <th width="10%">Numero</th>
                        <th width="10%">Coeficiente_Aerodinámico</th>
                        <th width="10%">Patrocinador</th>
                    </thead>
                    <tbody>
    `;

Automovilismo.plantillaTablaPersonas.cuerpo = `
<tr title="${Automovilismo.plantillaTags.NOMBRE}">
    <td>${Automovilismo.plantillaTags.NOMBRE}</td>
    <td>${Automovilismo.plantillaTags.TIPO_COMBUSTIBLE}</td>
    <td>${Automovilismo.plantillaTags.COLOR}</td>
    <td>${Automovilismo.plantillaTags.HP}</td>
    <td>${Automovilismo.plantillaTags.VELOCIDAD_MAXIMA}</td>
    <td>${Automovilismo.plantillaTags.FECHA_NACIMIENTO}</td>
    <td>${Automovilismo.plantillaTags.ANIOS_GANADOR}</td>
    <td>${Automovilismo.plantillaTags.NUMERO}</td>
    <td>${Automovilismo.plantillaTags.COEFICIENTE_AERODINAMICO}</td>
    <td>${Automovilismo.plantillaTags.PATROCINADOR}</td>
    <td>
                <div><a href="javascript:Plantilla.mostrar('${Automovilismo.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
    </td>
</tr>
`;

Automovilismo.plantillaTablaPersonas.pie = `  </tbody>
    </table>
    `;



/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Automovilismo.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
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


Automovilismo.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Automovilismo/getTodos"
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
        callBackFn(vectorPersonas.data,campo)

    }
}

Automovilismo.recuperaHU09 = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Automovilismo/getTodos"
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
        callBackFn(vectorPersonas.data, "Automovilismo")

    }
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Automovilismo.mostrarHome = function (datosDescargados) {


    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Automovilismo Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Automovilismo.mostrarAcercaDe = function (datosDescargados) {


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
        <li><b>Autor/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Automovilismo Acerca de", mensajeAMostrar)
}


Automovilismo.imprimeMuchasPersonas = function (vector){


    let msj = Automovilismo.plantillaTablaPersonas.cabecera

    if( vector && Array.isArray(vector)){
        vector.forEach(e => msj = msj + Automovilismo.plantillaTablaPersonas.actualiza(e))
    }

    msj += Automovilismo.plantillaTablaPersonas.pie
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)

}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Automovilismo.procesarHome = function () {
    this.descargarRuta("/Automovilismo/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Automovilismo.procesarAcercaDe = function () {
    this.descargarRuta("/Automovilismo/acercade", this.mostrarAcercaDe);
}

Automovilismo.plantillaTablaPersonas.actualiza = function (persona) {
    return Automovilismo.sustituyeTags(this.cuerpo, persona)
}

Automovilismo.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Automovilismo.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Automovilismo.plantillaTags.NOMBRE, 'g'), persona.data.Nombre)
        .replace(new RegExp(Automovilismo.plantillaTags.TIPO_COMBUSTIBLE, 'g'), persona.data.Tipo_Combustible)
        .replace(new RegExp(Automovilismo.plantillaTags.COLOR, 'g'), persona.data.Color)
        .replace(new RegExp(Automovilismo.plantillaTags.HP, 'g'), persona.data.HP)
        .replace(new RegExp(Automovilismo.plantillaTags.VELOCIDAD_MAXIMA, 'g'), persona.data.Velocidad_Maxima)
        .replace(new RegExp(Automovilismo.plantillaTags.FECHA_NACIMIENTO, 'g'), persona.data.Fecha_Nacimiento.anio + "/" + persona.data.Fecha_Nacimiento.mes + "/" + persona.data.Fecha_Nacimiento.dia)
        .replace(new RegExp(Automovilismo.plantillaTags.ANIOS_GANADOR, 'g'), persona.data.Anios_Ganador)
        .replace(new RegExp(Automovilismo.plantillaTags.NUMERO, 'g'), persona.data.Numero)
        .replace(new RegExp(Automovilismo.plantillaTags.COEFICIENTE_AERODINAMICO, 'g'), persona.data.Coeficiente_Aerodinámico)
        .replace(new RegExp(Automovilismo.plantillaTags.PATROCINADOR, 'g'), persona.data.Patrocinador)
}


Automovilismo.lista = function () {
    Automovilismo.recupera(Automovilismo.imprimeMuchasPersonas);
}
