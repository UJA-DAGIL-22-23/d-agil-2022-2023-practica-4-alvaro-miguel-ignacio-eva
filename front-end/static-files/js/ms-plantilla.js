/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};
/// Nombre de los campos del formulario para editar una persona
Plantilla.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    POSICION: "form-persona-posicion",
   // FECHADENACIMIENTO: "form-persona-fechaNacimiento",
    CASAHODWARTS: "form-persona-casaHodwats",
    COPASMUNDIALES: "form-persona-copasMundiales",
    TIPOESCOBA:"form-persona-tipoEscoba"
}
/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Microservicio MS Plantilla: acerca de",
    autor: "Eva",
    email: "etm00016@red.ujaen.es",
    fecha: "16/12/1999"

}
// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "POSICION": "### POSICION ###",
    "FECHADENACIMIENTO": "### FECHADENACIMIENTO ###",
    "CASAHODWARTS": "### CASAHODWARTS ###",
    "COPASMUNDIALES": "###COPASMUNDIALES ###",
    "TIPOESCOBA":"###TIPOESCOBA ###"

}
Plantilla.cerear = function ( num ) {
    return (num<10?"0":"")+num

}
/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.plantillaFormularioPersona = {}


// Cabecera del formulario
Plantilla.plantillaFormularioPersona.formulario = `
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
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-apellidos" value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-posicion" required value="${Plantilla.plantillaTags.POSICION}" 
                        name="posicion_persona"/></td>
                <td><input type="text" class="form-persona-elemento"  disabled
                        id="form-persona-fechaNacimiento" required value="${Plantilla.plantillaTags.FECHADENACIMIENTO}" 
                        name="fechaNacimiento_persona"/></td>
                          <td><input type="text" class="form-persona-elemento editable"   
                        id="form-persona-casaHodwats" required value="${Plantilla.plantillaTags.CASAHODWARTS}" 
                        name="casaHodwarts"/></td>
                 <td><input type="text" class="form-persona-elemento editable" 
                        id="form-persona-copasMundiales" required value="${Plantilla.plantillaTags.COPASMUNDIALES}" 
                        name="copasMundiales_persona"/></td>
                <td width="20%"><input type="text" class="form-persona-elemento editable"   
                        id="form-persona-tipoEscoba" required value="${Plantilla.plantillaTags.TIPOESCOBA}" 
                        name="tipoEscoba_persona"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;



// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
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
Plantilla.plantillaTablaPersonas.cabecera2 = `<table width="100%" class="listado-personas">
                    <thead>
                    
                        <th width="100%">Nombre</th>
   
                    </thead>
                    <tbody>
    `;


// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
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


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/Quidditch/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/Quidditch/acercade", this.mostrarAcercaDe);
}
/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Plantilla.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)
}

Plantilla.imprimeNombreMuchasPersonas = function (vector) {
     //console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza2(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie
     // Para comprobar lo que hay en vector
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
}

Plantilla.imprimeOrdenadorAlfabeticamente = function(vector,campo){

        //console.log(vector) // Para comprobar lo que hay en vector

        // Compongo el contenido que se va a mostrar dentro de la tabla
        let msj = Plantilla.plantillaTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a,b)
        {
            let campoA = null; //= a.data[campo].toUpperCase();
            let campoB = null;  //= b.data[campo].toUpperCase();
            if(campo == 'fechaNacimiento'){
                campoA = a.data[campo].annio + "" +  Plantilla.cerear(a.data[campo].mes) + ""+ Plantilla.cerear(a.data[campo].dia)
                campoB = b.data[campo].annio + "" +   Plantilla.cerear(b.data[campo].mes) + ""+ Plantilla.cerear(b.data[campo].dia)
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
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza2(e))
    }
        msj += Plantilla.plantillaTablaPersonas.pie
        // Para comprobar lo que hay en vector
        // Borro toda la info de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizar("Listado de personas ordenadas alfabeticamente solo con su nombre", msj)

}


Plantilla.imprimeOrdenadorAlfabeticamenteTodosCampos = function(vector,campo){

    //console.log(vector) // Para comprobar lo que hay en vector
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a,b)
        {
            let campoA = null; //= a.data[campo].toUpperCase();
            let campoB = null;  //= b.data[campo].toUpperCase();
            if(campo == 'fechaNacimiento'){
                campoA = a.data[campo].annio + "" +  Plantilla.cerear(a.data[campo].mes) + ""+ Plantilla.cerear(a.data[campo].dia)
                campoB = b.data[campo].annio + "" +   Plantilla.cerear(b.data[campo].mes) + ""+ Plantilla.cerear(b.data[campo].dia)
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
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie
    // Para comprobar lo que hay en vector
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas ordenadas alfabeticamente con todos sus datos", msj)

}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}
Plantilla.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Plantilla.sustituyeTags2(this.cuerpo2, persona)
}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Plantilla.plantillaTags.FECHADENACIMIENTO, 'g'), persona.data.fechaNacimiento.annio + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.CASAHODWARTS, 'g'), persona.data.casaHogwarts)
        .replace(new RegExp(Plantilla.plantillaTags.COPASMUNDIALES, 'g'), persona.data.copasMundiales)
        .replace(new RegExp(Plantilla.plantillaTags.TIPOESCOBA, 'g'), persona.data.tipoEscoba)

}
Plantilla.sustituyeTags2 = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)

}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn,campo) {
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
Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listar2 = function () {
    Plantilla.recupera(Plantilla.imprimeNombreMuchasPersonas);
}

Plantilla.listar3 = function (campo) {
    Plantilla.recupera(Plantilla.imprimeOrdenadorAlfabeticamente,campo);
}

Plantilla.listar4 = function (campo) {
    Plantilla.recupera(Plantilla.imprimeOrdenadorAlfabeticamenteTodosCampos,campo);
}

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.FECHADENACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.CASAHODWARTS}</td>
        <td>${Plantilla.plantillaTags.COPASMUNDIALES}</td>
        <td>${Plantilla.plantillaTags.TIPOESCOBA}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo2 = `
    <tr title="${Plantilla.plantillaTags.ID}">
      
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
      
   
    </tr>
    `;

Plantilla.mostrar = function (idPersona ) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
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

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}


/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}


// ultimas funcionalidades del formulario


/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this

}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {
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
Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Plantilla.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Plantilla.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}
/**
 * Función para guardar los nuevos datos de una persona
 */
Plantilla.guardar = async function () {
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
        Plantilla.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

/**
 * Función que muestre el jugador con el nombre indicado
 */

Plantilla.jugadorBuscado = function (nombreBuscado){
    this.recuperaJugadorBuscado(nombreBuscado, this.imprimeMuchasPersonas);
}

/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaJugadorBuscado = async function (nombreBuscado, callBackFn) {
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