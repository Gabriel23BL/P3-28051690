import { direccionLocal } from "./constantes.js";

export async function consultarUsuarioActivo() {
  try {
    fetch(`${direccionLocal}/api/usuario-activo`, {
      method: "GET",
      credentials: "include", // Esto incluye las cookies con la solicitud
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          window.location.href = "/";
        }

        document.getElementById(
          "nombre-usuario-activo"
        ).innerHTML = `<span><i class="bi bi-person"></i>${data.usuarioActivo.nombre}</span>`;
        //console.log(data.usuarioActivo.nombre);
        if (data.usuarioActivo.tipo_usuario === "administrador") {
          document.getElementById("gestion").innerHTML = `
          <li class="nav-item d-none d-md-flex">
                <a class="dropdown-item" href="/gestion">Gestion</a>
              </li>

              <li class="nav-item d-md-none">
                <a class="dropdown-item" href="/gestion">Gestion</a>
              </li>
        `;

          document.getElementById("registrar-productos").innerHTML = `
          <li class="nav-item d-none d-md-flex">
                <a class="dropdown-item" href="/registrar-productos">Registrar producto</a>
              </li>

              <li class="nav-item d-md-none">
                <a class="dropdown-item" href="/registrar-productos">Registrar producto</a>
              </li>
        `;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("Error, al consultar usuario activo");
  }
}
