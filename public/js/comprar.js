//usuario en linea
import { direccionLocal } from "./constantes.js";
import { consultarUsuarioActivo } from "./usuarioActivo.js";
import { todosProductosDisponibles } from "./todosLosProductosComprar.js";

consultarUsuarioActivo();

todosProductosDisponibles();

//Perfil usuario activo

document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.getElementById("profile-button");
  const profileMenu = document.getElementById("profile-menu");

  // Mostrar/Ocultar el menú del perfil
  profileButton.addEventListener("click", () => {
    profileMenu.style.display =
      profileMenu.style.display === "block" ? "none" : "block";
  });

  // Manejo de eventos para los botones del menú
  document
    .getElementById("change-password-button")
    .addEventListener("click", () => {
      // Redirigir al hacer clic en el botón "Cambiar Clave"
      document.getElementById('change-password-button').addEventListener('click', function() {
  window.location.href = '/cambiar-clave'; // Ruta a la página de cambio de clave
      });

      // Manejar el envío del formulario de cambio de contraseña
      document.getElementById('changePasswordForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const messageDiv = document.getElementById('message');

  if (newPassword !== confirmPassword) {
      messageDiv.textContent = 'Las contraseñas no coinciden.';
      messageDiv.style.color = 'red';
      return;
  }

  // Aquí puedes agregar la lógica para cambiar la contraseña, como una llamada a una API.

  messageDiv.textContent = 'Contraseña cambiada con éxito.';
  messageDiv.style.color = 'green';

  // Limpiar el formulario
  document.getElementById('changePasswordForm').reset();
      });

    });

  document.getElementById("logout-button").addEventListener("click", () => {
    // Lógica para cerrar sesión
    fetch(`${direccionLocal}/api/cerrar-sesion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      console.log("Cerrando sesion...");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    });
  });

  // Cerrar el menú si se hace clic fuera de él
  window.addEventListener("click", (event) => {
    if (
      !profileButton.contains(event.target) &&
      !profileMenu.contains(event.target)
    ) {
      profileMenu.style.display = "none";
    }
  });
});


