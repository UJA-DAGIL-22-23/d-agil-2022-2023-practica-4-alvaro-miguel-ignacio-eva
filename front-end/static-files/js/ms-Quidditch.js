/**
 * @file Quidditch.js
 * @description Funciones para el procesamiento de la info enviada por el MS Quidditch
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Quidditch = {};
/// Nombre de los campos del formulario para editar una persona
Quidditch.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    POSICION: "form-persona-posicion",
   // FECHADENACIMIENTO: "form-persona-fechaNacimiento",
    CASAHODWARTS: "form-persona-casaHodwats",
    COPASMUNDIALES: "form-persona-copasMundiales",
    TIPOESCOBA:"form-persona-tipoEscoba"
}
/// Quidditch para poner los datos de varias personas dentro de una tabla
Quidditch.QuidditchTablaPersonas = {}

// Quidditch de datosDescargados vacíos
Quidditch.datosDescargadosNulos = {
    mensaje: "Microservicio MS Quidditch: acerca de",
    autor: "Eva",
    email: "etm00016@red.ujaen.es",
    fecha: "16/12/1999"

}
// Tags que voy a usar para sustituir los campos
Quidditch.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "POSICION": "### POSICION ###",
    "FECHADENACIMIENTO": "### FECHADENACIMIENTO ###",
    "CASAHODWARTS": "### CASAHODWARTS ###",
    "COPASMUNDIALES": "###COPASMUNDIALES ###",
    "TIPOESCOBA":"###TIPOESCOBA ###"

}
Quidditch.cerear = function ( num ) {
    return (num<10?"0":"")+num

}
/// Quidditch para poner los datos de una persona en un tabla dentro de un formulario
Quidditch.QuidditchFormularioPersona = {}


// Cabecera del formulario
Quidditch.QuidditchFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
             <th width="10%">Id</th>
                        <th width="10%">Nombre</th>
                        <th width="10%">Apellidos</th>
                        <th width="10%">Posicion</th>
                        <th width="10%">FechaDeNacimiento</th>
                        <th width="10%">cadaHodwarts</th>
                        <th width="10%">CopasMundiales</th>
                         <th width="10%">TipoEscoba</th>
                        <th width="10%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Quidditch.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Quidditch.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-nombre" required value="${Quidditch.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-apellidos" value="${Quidditch.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-posicion" required value="${Quidditch.plantillaTags.POSICION}" 
                        name="posicion_persona"/></td>
                <td><input type="text" class="form-persona-elemento"  disabled
                        id="form-persona-fechaNacimiento" required value="${Quidditch.plantillaTags.FECHADENACIMIENTO}" 
                        name="fechaNacimiento_persona"/></td>
                          <td><input type="text" class="form-persona-elemento editable"   
                        id="form-persona-casaHodwats" required value="${Quidditch.plantillaTags.CASAHODWARTS}" 
                        name="casaHodwarts"/></td>
                 <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-copasMundiales" required value="${Quidditch.plantillaTags.COPASMUNDIALES}" 
                        name="copasMundiales_persona"/></td>
                <td width="20%"><input type="text" class="form-persona-elemento editable"   
                        id="form-persona-tipoEscoba" required value="${Quidditch.plantillaTags.TIPOESCOBA}" 
                        name="tipoEscoba_persona"/></td>
                <td>
                    <div><a href="javascript:Quidditch.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Quidditch.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Quidditch.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;



// Cabecera de la tabla
Quidditch.QuidditchTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="10%">Nombre</th>
                        <th width="10%">Apellidos</th>
                        <th width="10%">Posicion</th>
                        <th width="20%">FechaDeNacimiento</th>
                        <th width="10%">cadaHodwarts</th>
                        <th width="20%">CopasMundiales</th>
                         <th width="10%">TipoEscoba</th>
                   
                        <th width="10%">Acciones</th>
                    </thead>
                    <tbody>
    `;

// Cabecera de la tabla
Quidditch.QuidditchTablaPersonas.cabecera2 = `<table width="100%" class="listado-personas">
                    <thead>
                    
                        <th width="100%">Nombre</th>
   
                    </thead>
                    <tbody>
    `;


// Pie de la tabla
Quidditch.QuidditchTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Función que descarga la info MS Quidditch al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Quidditch.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Quidditch
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Quidditch
 */
Quidditch.mostrarHome = function (datosDescargados) {

    //registrarSeleccion("Home");

    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Quidditch Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Quidditch
 */
Quidditch.mostrarAcercaDe = function (datosDescargados) {

    //registrarSeleccion("Acerca de 🧹");

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
        <li><b>Mensaje/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor </b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha de Nacimiento </b>: ${datosDescargados.fecha}</li>
  
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Quidditch Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Quidditch.procesarHome = function () {
    this.descargarRuta("/Quidditch/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Quidditch.procesarAcercaDe = function () {
    this.descargarRuta("/Quidditch/acercade", this.mostrarAcercaDe);
}
/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Quidditch.imprimeMuchasPersonas = function (vector) {

    //registrarSeleccion("Listar jugadores con todos sus datos");

    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Quidditch.QuidditchTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Quidditch.QuidditchTablaPersonas.actualiza(e))
    }
    msj += Quidditch.QuidditchTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)
}

Quidditch.imprimeNombreMuchasPersonas = function (vector) {

    //registrarSeleccion("Listar jugadores solo con el nombre");

     //console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Quidditch.QuidditchTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
    vector.forEach(e => msj += Quidditch.QuidditchTablaPersonas.actualiza2(e))
    }
    msj += Quidditch.QuidditchTablaPersonas.pie
     // Para comprobar lo que hay en vector
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
}

Quidditch.imprimeOrdenadorAlfabeticamente = function(vector,campo){

    //registrarSeleccion("Listar alfabeticamente por nombre");

        //console.log(vector) // Para comprobar lo que hay en vector

        // Compongo el contenido que se va a mostrar dentro de la tabla
        let msj = Quidditch.QuidditchTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a,b)
        {
            let campoA = null; //= a.data[campo].toUpperCase();
            let campoB = null;  //= b.data[campo].toUpperCase();
            if(campo == 'fechaNacimiento'){
                campoA = a.data[campo].annio + "" +  Quidditch.cerear(a.data[campo].mes) + ""+ Quidditch.cerear(a.data[campo].dia)
                campoB = b.data[campo].annio + "" +   Quidditch.cerear(b.data[campo].mes) + ""+ Quidditch.cerear(b.data[campo].dia)
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
        vector.forEach(e => msj += Quidditch.QuidditchTablaPersonas.actualiza2(e))
    }
        msj += Quidditch.QuidditchTablaPersonas.pie
        // Para comprobar lo que hay en vector
        // Borro toda la info de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizar("Listado de personas ordenadas alfabeticamente solo con su nombre", msj)

}


Quidditch.imprimeOrdenadorAlfabeticamenteTodosCampos = function(vector,campo){

    //registrarSeleccion("Listar datos por nombre alfabéticamente");

    //console.log(vector) // Para comprobar lo que hay en vector
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Quidditch.QuidditchTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a,b)
        {
            let campoA = null; //= a.data[campo].toUpperCase();
            let campoB = null;  //= b.data[campo].toUpperCase();
            if(campo == 'fechaNacimiento'){
                campoA = a.data[campo].annio + "" +  Quidditch.cerear(a.data[campo].mes) + ""+ Quidditch.cerear(a.data[campo].dia)
                campoB = b.data[campo].annio + "" +   Quidditch.cerear(b.data[campo].mes) + ""+ Quidditch.cerear(b.data[campo].dia)
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
        vector.forEach(e => msj += Quidditch.QuidditchTablaPersonas.actualiza(e))
    }
    msj += Quidditch.QuidditchTablaPersonas.pie
    // Para comprobar lo que hay en vector
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas ordenadas alfabeticamente con todos sus datos", msj)

}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La Quidditch del cuerpo de la tabla con los datos actualizados
 */
Quidditch.QuidditchTablaPersonas.actualiza = function (persona) {
    return Quidditch.sustituyeTags(this.cuerpo, persona)
}
Quidditch.QuidditchTablaPersonas.actualiza2 = function (persona) {
    return Quidditch.sustituyeTags2(this.cuerpo2, persona)
}

/**
 * Actualiza el cuerpo de la Quidditch deseada con los datos de la persona que se le pasa
 * @param {String} Quidditch Cadena conteniendo HTML en la que se desea cambiar lso campos de la Quidditch por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La Quidditch del cuerpo de la tabla con los datos actualizados
 */
Quidditch.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Quidditch.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Quidditch.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Quidditch.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Quidditch.plantillaTags.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Quidditch.plantillaTags.FECHADENACIMIENTO, 'g'), persona.data.fechaNacimiento.annio + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.dia)
        .replace(new RegExp(Quidditch.plantillaTags.CASAHODWARTS, 'g'), persona.data.casaHogwarts)
        .replace(new RegExp(Quidditch.plantillaTags.COPASMUNDIALES, 'g'), persona.data.copasMundiales)
        .replace(new RegExp(Quidditch.plantillaTags.TIPOESCOBA, 'g'), persona.data.tipoEscoba)

}
Quidditch.sustituyeTags2 = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Quidditch.plantillaTags.NOMBRE, 'g'), persona.data.nombre)

}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Quidditch.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Quidditch/getTodas"
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

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Quidditch.listar = function () {
    Quidditch.recupera(Quidditch.imprimeMuchasPersonas);
}

Quidditch.listar2 = function () {
    Quidditch.recupera(Quidditch.imprimeNombreMuchasPersonas);
}

Quidditch.listar3 = function (campo) {
    Quidditch.recupera(Quidditch.imprimeOrdenadorAlfabeticamente,campo);
}

Quidditch.listar4 = function (campo) {
    Quidditch.recupera(Quidditch.imprimeOrdenadorAlfabeticamenteTodosCampos,campo);
}

// Elemento TR que muestra los datos de una persona
Quidditch.QuidditchTablaPersonas.cuerpo = `
    <tr title="${Quidditch.plantillaTags.ID}">
        <td>${Quidditch.plantillaTags.ID}</td>
        <td>${Quidditch.plantillaTags.NOMBRE}</td>
        <td>${Quidditch.plantillaTags.APELLIDOS}</td>
        <td>${Quidditch.plantillaTags.POSICION}</td>
        <td>${Quidditch.plantillaTags.FECHADENACIMIENTO}</td>
        <td>${Quidditch.plantillaTags.CASAHODWARTS}</td>
        <td>${Quidditch.plantillaTags.COPASMUNDIALES}</td>
        <td>${Quidditch.plantillaTags.TIPOESCOBA}</td>
        <td>
                    <div><a href="javascript:Quidditch.mostrar('${Quidditch.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Quidditch.QuidditchTablaPersonas.cuerpo2 = `
    <tr title="${Quidditch.plantillaTags.ID}">
      
        <td>${Quidditch.plantillaTags.NOMBRE}</td>
      
   
    </tr>
    `;

Quidditch.mostrar = function (idPersona ) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Quidditch.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Quidditch/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway :(")
        console.error(error)
    }
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Quidditch.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Quidditch.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Quidditch.almacenaDatos(persona)
}


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la Quidditch del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Quidditch.personaComoFormulario = function (persona) {
    return Quidditch.QuidditchFormularioPersona.actualiza( persona );
}


/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La Quidditch del cuerpo de la tabla con los datos actualizados
 */
Quidditch.QuidditchFormularioPersona.actualiza = function (persona) {
    return Quidditch.sustituyeTags(this.formulario, persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Quidditch.almacenaDatos = function (persona) {
    Quidditch.personaMostrada = persona;
}


// ultimas funcionalidades del formulario


/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Quidditch.form) {
        document.getElementById(Quidditch.form[campo]).disabled = deshabilitando
    }
    return this

}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.deshabilitarCamposEditables = function () {
    Quidditch.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.habilitarCamposEditables = function () {
    Quidditch.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Quidditch.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Quidditch.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Quidditch.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Quidditch.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Quidditch.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Quidditch.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}
/**
 * Función para guardar los nuevos datos de una persona
 */
Quidditch.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/Quidditch/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        let fechaNacimiento_persona =  document.getElementById("form-persona-fechaNacimiento").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "apellidos_persona": document.getElementById("form-persona-apellidos").value,
                "posicion_persona": document.getElementById("form-persona-posicion").value,
               "fechaNacimiento_persona": fechaNacimiento_persona,
                "casaHodwarts_persona": document.getElementById("form-persona-casaHodwats").value,
                "copasMundiales_persona": document.getElementById("form-persona-copasMundiales").value,
                "tipoEscoba_persona": document.getElementById("form-persona-tipoEscoba").value


            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Quidditch.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

/**
 * Función que muestre el jugador con el nombre indicado
 */

Quidditch.jugadorBuscado = function (nombreBuscado){
    this.recuperaJugadorBuscado(nombreBuscado, this.imprimeMuchasPersonas);
}

/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Quidditch.recuperaJugadorBuscado = async function (nombreBuscado, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Quidditch/getTodas"
        const response = await fetch(url);
        let vectorJugadores = null
        if (response) {
            const vectorJugadores = await response.json()
            const filtro = vectorJugadores.data.filter(persona => persona.data.nombre === nombreBuscado)
            callBackFn(filtro)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway para recuperar Jugador Buscado")
        console.error(error)
    }
}