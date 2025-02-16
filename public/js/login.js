import { direccionLocal } from "./constantes.js";

/** entrarAlSistema recibe los datos del formulario para hacer login */
const entrarAlSistema = document.getElementById('login');
//const msjUsuario = document.getElementById("registroExitosoUsuario");
/** msj muestra los msj de advertencia al intentar hacer login */
const msj = document.getElementById("validar");
/** divMsj imprime los msj */
const divMsj = document.getElementById("validar");

entrarAlSistema.addEventListener('submit', login);

/** login envia los datos correspondientes para iniciar sesion */
async function login(e) {
  e.preventDefault();
  const correo = e.target.correo.value;
  const clave = e.target.clave.value;
  
  const respuesta = await fetch(`${direccionLocal}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correo,
      clave
    })
  })

  const respuestaJson = await respuesta.json();
  const statusError = respuestaJson.status;
  const mensaje = respuestaJson.message;  

  console.log(respuestaJson);
  
 
  if (statusError == 'error') {    
    mensajesValidacion(mensaje)
  } else {
    window.location.href = respuestaJson.redirect;
  }

}

/** mensajesValidacion recibe los mensajes al iniciar sesion y muestra la respuesta */
async function mensajesValidacion(mensaje) {
  
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">${mensaje}</div>`;
    toggleMensajes();
}

/** toggleMensajes se encarga de ocultar el msj de la respuesta */
async function toggleMensajes() {
  setTimeout(() => {
    msj.classList.remove("mostrarMsjValidacion");
    msj.classList.add("ocultarMsjValidacion");
    divMsj.innerHTML = '';
  }, "3000");
}

/** toggleCuadroMensajes se encarga de ocultar el cuadro de los mensajes */
async function toggleCuadroMensajes() {
  msj.classList.remove("ocultarMsjValidacion");
  msj.classList.add("mostrarMsjValidacion");
}
