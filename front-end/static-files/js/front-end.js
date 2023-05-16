/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */


let Frontend = {};
let msj = ``;

Frontend.AcercaDeMensaje=``;


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_OCULTAR = "ocultar"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"

Frontend.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "Miguel Angel Carrasco Infante",
    email: "maci0002@red.ujaen.es",
    fecha: "13/08/01"
}



/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}



/// Objeto dentro Frontend para tratar con el contenido de Article
Frontend.Article = {}

///Atributos globales
Frontend.vectorNombreDeporte = {
    nombre: [],
    deporte: []
}
Frontend.vAux = []

Frontend.vectorSoloNombres = []
Frontend.deporte= ""
/**
 * Quita a un elemento del cual se pasa él mismo o su ID la clase indicada por nombreClase
 * @param {string} elemento Elemento o id del elemento
 * @param {string} nombreClase Nombre de la clase a quitar
 */
Frontend.quitarClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

/**
 * Añade a un elemento del cual se pasa él mismo o su ID la clase indicada por nombreClase
 * @param {string} elemento Elemento o id del elemento
 * @param {string} nombreClase Nombre de la clase a quitar
 */
Frontend.aniadirClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase, por si ya estuviera
        .concat(nombreClase) // Añado la clase indicada en nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

Frontend.mostrarAcercaDeTodos = function(){
    Frontend.AcercaDeMensaje="";
    BADMINTON.descargarRuta("/BADMINTON/acercade", this.mostrarAcercaDe)
    Rugby.descargarRuta("/Rugby/acercade", this.mostrarAcercaDe)
    Automovilismo.descargarRuta("/Automovilismo/acercade", this.mostrarAcercaDe)
    Quidditch.descargarRuta("/Quidditch/acercade", this.mostrarAcercaDe)
}

Frontend.mostrarNombresHu06 = function() {
    Frontend.AcercaDeMensaje="";
    BADMINTON.recupera(Frontend.imprimeNombres);
    Rugby.recupera(Frontend.imprimeNombres);
    Automovilismo.recupera(Frontend.imprimeNombres2);
    Quidditch.recupera(Frontend.imprimeNombres);
}

Frontend.imprimeNombres = function(vector) {
    vector.forEach(e => Frontend.vAux.push(e.data.nombre))
    let msj = `<div>`
    Frontend.vAux.forEach(e => msj += `<p> ${e} </p>`)
    msj += `</div>`
    Frontend.Article.actualizar("Nombres jugadores de todas las bases de datos:", msj)

  }
  Frontend.imprimeNombres2 = function(vector) {

    vector.forEach(e => Frontend.vAux.push(e.data.Nombre))
    let msj = `<div>`
    Frontend.vAux.forEach(e => msj += `<p> ${e} </p>`)
    msj += `</div>`
    Frontend.Article.actualizar("Nombres jugadores de todas las bases de datos ordenados:", msj)

}
  


Frontend.mostrarAcercaDe = function(datosDescargados){
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
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
   Frontend.AcercaDeMsj += mensajeAMostrar;
   Frontend.Article.actualizar("Acerca De", Frontend.AcercaDeMsj);
}

/**
 * Muestro el article
 * @returns El propio Article para poder concatenar llamadas
 */
Frontend.Article.mostrar = function () {
    let article = document.getElementById(Frontend.ID_SECCION_PRINCIPAL);
    Frontend.quitarClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_OCULTAR)
        .aniadirClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_MOSTRAR)

}
/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}

let ValorContraste = false;
  Frontend.contraste = function() {
    if(ValorContraste == false){
        const body = document.querySelector('body');
        body.setAttribute("style", "background-color: #000000; color: #ffffff;")
        ValorContraste = true;
    }else{
        const body = document.querySelector('body');
        body.setAttribute("style", "background-color: #ffffff; color: #000000;")
        ValorContraste = false;
    }
  }



Frontend.burcarNombresDeporte = function(){
    Frontend.deporte="Rugby";
    Rugby.recuperaHU09(Frontend.datosDeportistas);
     Frontend.deporte="Quidditch";
     Quidditch.recuperaHU09(Frontend.datosDeportistas);
    Frontend.deporte="Automovilismo";
    Automovilismo.recuperaHU09(Frontend.datosDeportistas2);
    Frontend.deporte="BADMINTON";
    BADMINTON.recuperaHU09(Frontend.datosDeportistas);

    Frontend.vectorSoloNombres=[]
    Frontend.vectorNombreDeporte.nombre =[]
    Frontend.vectorNombreDeporte.deporte = []

    let msj = `<div>
            <p> Buscar jugadores cuyo nombre incluye: </p>
            <input type="text" id="id_Texto">
            <button onclick = "javascript:Frontend.buscarSiCadenaEnNombre();"> Buscando</button>
            </div>`;

    Frontend.Article.actualizar("busco jugadores", msj)


}

Frontend.buscarSiCadenaEnNombre = texto => {
     texto=document.getElementById("id_Texto").value
    let msj = ``;
    console.log(Frontend.vectorNombreDeporte.nombre.length);

    for(var i= 0; i<Frontend.vectorNombreDeporte.nombre.length; i++){
          let nombre = Frontend.vectorNombreDeporte.nombre[i];
          let deporte = Frontend.vectorNombreDeporte.deporte[i];
        console.log(nombre);
        console.log(deporte);
          if(nombre.includes(texto)){
              console.log(texto);
               msj += `<div>
                        <p>Nombre del jugador: ${nombre}</p>
                        <p>Deporte del deporte: ${deporte}</p>
                        </div>`;

          }
      }
    Frontend.Article.actualizar("busco jugadores por nombre", msj)
}

Frontend.datosDeportistas = function (vector , deporte ){
    vector.forEach (element => Frontend.vectorSoloNombres.push(element.data.nombre))
    vector.forEach(element => Frontend.vectorNombreDeporte.nombre.push(element.data.nombre) )

    vector.forEach(element => Frontend.vectorNombreDeporte.deporte.push(deporte))

  Frontend.vNombres = []


  Frontend.FusionVec = function(vector) {

      vector.forEach(e => Frontend.vNombres.push(e.data.nombre))
      Frontend.vNombres.sort((a, b) => a.localeCompare(b));
      let msj = `<div>`
      Frontend.vNombres.forEach(e => msj += `<p> ${e} </p>`)
      msj += `</div>`
      Frontend.Article.actualizar("Nombres jugadores de todas las bases de datos ordenados:", msj)

  }

//Segunda funcion implementada para procesar los nombres de ms-Automovilismo
  Frontend.FusionVec2 = function(vector) {

    vector.forEach(e => Frontend.vNombres.push(e.data.Nombre))
    Frontend.vNombres.sort((a, b) => a.localeCompare(b));
    let msj = `<div>`
    Frontend.vNombres.forEach(e => msj += `<p> ${e} </p>`)
    msj += `</div>`
    Frontend.Article.actualizar("Nombres jugadores de todas las bases de datos ordenados:", msj)


}


Frontend.datosDeportistas2 = function (vector , deporte ){
    vector.forEach (element => Frontend.vectorSoloNombres.push(element.data.nombre))
    vector.forEach(element => Frontend.vectorNombreDeporte.nombre.push(element.data.Nombre) )
    vector.forEach(element => Frontend.vectorNombreDeporte.deporte.push(deporte))

}

  Frontend.TodosNombresOrdenados = function() {
    Frontend.vNombres = []  
      Quidditch.recupera(Frontend.FusionVec);
      Rugby.recupera(Frontend.FusionVec);
      BADMINTON.recuperaTodos(Frontend.FusionVec);
      Automovilismo.recupera(Frontend.FusionVec2);
  }
