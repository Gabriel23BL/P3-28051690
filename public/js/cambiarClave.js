import { direccionLocal } from "./constantes.js";


/** entrarAlSistema recibe los datos del formulario para hacer login */
const cambiarClave = document.getElementById('changePasswordForm');
//const msjUsuario = document.getElementById("registroExitosoUsuario");
/** msj muestra los msj de advertencia al intentar hacer login */
const msj = document.getElementById("validar");
/** divMsj imprime los msj */
const divMsj = document.getElementById("validar");

cambiarClave.addEventListener('submit', cambiandoClave);

/** cambiandoClave envia los datos correspondientes para iniciar sesion */
async function cambiandoClave(e) {
  e.preventDefault();
  const claveVieja = e.target.claveVieja.value;
  const claveNueva = e.target.newClave.value;
  const claveNuevaConfirmar = e.target.confirmClave.value;

  console.log(claveVieja, claveNueva, claveNuevaConfirmar);
  
  
  const respuesta = await fetch(`${direccionLocal}/api/cambiar-clave-loggueado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      claveVieja: claveVieja,
      claveNuevaUno: claveNueva,
      clavNuevaDos: claveNuevaConfirmar,
    })
  })

  const respuestaJson = await respuesta.json();
  const statusError = respuestaJson.status;
  const mensaje = respuestaJson.message;  

  console.log(respuestaJson);
  
 
  if (statusError == 'error') {    
    mensajesValidacion(mensaje)
  } else {
    mensajesValidacion(mensaje)
    setTimeout(() => {
      window.location.href = '/comprar-productos';
    }, 3000);
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
