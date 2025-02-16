import { direccionLocal } from "./constantes.js";

const autenticandoUsuario = document.getElementById('mostrar-msj-validacion');
const irA = document.getElementById('ir-a');
const salirValidacion = document.getElementById('salir-validacion');

async function irLogin() {
  // Redirecciona al login
  window.location.href = "/login";
}

async function salir() {
  console.log('Saliendo...');
  window.close();
}

const enviarPeticionAlBackend = async () => {
  const url = `${direccionLocal}/api/comprobar-token`;
  const data = { url: window.location.href };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resultado = await response.json();
    console.log("Su peticion:", resultado.message);
    autenticandoUsuario.innerHTML = `${resultado.message}`;

    if (resultado.status === 'ok') {
      irA.innerHTML = `<button class="border border-black rounded-md h-12 w-48 bg-[#8f7ad7] text-white font-semibold tracking-[2px] hover:w-52 transition-all ease-in-out duration-700" type="button" id="validado">Login</button>`;
      document.getElementById("validado").addEventListener("click", irLogin);
    } else {
      irA.innerHTML = `<button class="border border-black rounded-md h-12 w-48 bg-[#8f7ad7] text-white font-semibold tracking-[2px] hover:w-52 transition-all ease-in-out duration-700" type="button" id="salir-validacion">Salir</button>`;
      document.getElementById("salir-validacion").addEventListener("click", salir);
    }

    return true;
  } catch (error) {
    console.log("Error:", error);
    autenticandoUsuario.innerHTML = `Ups algo salio mal...`;
    irA.innerHTML = `<button class="border border-black rounded-md h-12 w-48 bg-[#8f7ad7] text-white font-semibold tracking-[2px] hover:w-52 transition-all ease-in-out duration-700" type="button" id="salir-validacion">Salir</button>`;
      document.getElementById("salir-validacion").addEventListener("click", salir);
    return false;
  }
}

// Ejecuta la función para enviar la petición al backend
enviarPeticionAlBackend();











