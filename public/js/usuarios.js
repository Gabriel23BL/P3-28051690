import { direccionLocal } from "./constantes.js";

console.log(direccionLocal);

/** registroUsuarios recibe los datos del formulario para hacer guardar un nuevo usuario */
let registroUsuarios = document.getElementById("registrar");
/** msj muestra los msj de advertencia al intentar hacer login */
let msj = document.getElementById("validar");
/** divMsj imprime los msj */
let divMsj = document.getElementById("validar");

registroUsuarios.addEventListener("submit", registrar);

/** registrar se encarga de enviar los datos para guardar un nuevo usuario y recibe
  la respuesta de lo que sucede */
async function registrar(e) {
  e.preventDefault();
  const cedula = e.target.cedula.value;
  const nombre = e.target.nombre.value;
  const apellido = e.target.apellido.value;
  const correo = e.target.correo.value;
  const claveUno = e.target.claveUno.value;
  const claveDos = e.target.claveDos.value;

  const respuesta = await fetch(`${direccionLocal}/api/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      claveUno: claveUno,
      claveDos: claveDos
    })
  })

  const respuestaJson = await respuesta.json();
  const statusError = respuestaJson.status;
  const mensaje = respuestaJson.message;

  console.log(statusError);
 
  if (statusError == 'error') {
    mensajesValidacion(mensaje)
  } else {
    mensajesValidacion(mensaje)
    setInterval(() => {
      window.location.href = respuestaJson.redirect;
    }, 4000);
  }
}

/** mensajesValidacion recibe la respuesta del guardado del nuevo usuario y muestra
  el msj correspondiente a la repuesta */
async function mensajesValidacion(mensaje) {
  toggleCuadroMensajes()
  divMsj.innerHTML = `<div class="text-[20px]">${mensaje}</div>`;
  toggleMensajes();
}

/** toggleMensajes oculta los mensajes de validacion */
async function toggleMensajes() {
  setTimeout(() => {
    msj.classList.remove("mostrarMsjValidacion");
    msj.classList.add("ocultarMsjValidacion");
    divMsj.innerHTML = '';
  }, "3000");
}

/** toggleMensajes oculta o muestra el cuadro de validacion */
async function toggleCuadroMensajes() {
  msj.classList.remove("ocultarMsjValidacion");
  msj.classList.add("mostrarMsjValidacion");
}
