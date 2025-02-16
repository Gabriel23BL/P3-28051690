import { direccionLocal } from "./constantes.js";

export function confirmar() {
  try {
    fetch(`${direccionLocal}/api/productos-disponibles`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error en la respuesta de la API: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        let productosContent = ""; // Variable para acumular el contenido de productos

        // Asegúrate de que data.productosDisponibles sea un array
        if (Array.isArray(data.productosDisponibles)) {
          data.productosDisponibles.forEach((element) => {
            // Agrega solo una fila a la tabla
            let rowContent = `
                        <tr>
                            <td>${element.producto}</td>
                            <td>${element.codigo}</td>
                            <td>${element.precio}</td>
                            <td>
                             <button class="btn btn-primary confirm-btn" 
                               data-id="${element.id}">
                               Confirmar
                             </button>
                            </td>
                        </tr>
                    `;
            productosContent += rowContent; // Acumula el contenido de cada producto
          });

          // Inserta el contenido acumulado en el contenedor
          document.getElementById("productos-container").innerHTML =
            productosContent;

          // Agregar eventos a los botones de confirmar
          document.querySelectorAll(".confirm-btn").forEach((button) => {
            button.addEventListener("click", function () {
              const productId = this.getAttribute("data-id");

              // Mostrar el modal de confirmación
              $("#confirmModal").modal("show");

              // Configurar el botón de confirmación para la acción
              document.getElementById("confirmAction").onclick = function () {
                // Aquí puedes definir la acción que deseas realizar al confirmar
                // Por ejemplo, podrías enviar una solicitud a la API para realizar una acción específica
                fetch(`${direccionLocal}/api/confirmar-accion/${productId}`, {
                  method: "POST", // Cambia el método según sea necesario
                  credentials: "include",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(
                        "Error al confirmar la acción: " + response.statusText
                      );
                    }
                    $("#confirmModal").modal("hide");
                    // Si la acción fue exitosa, puedes volver a llamar a gestionar() para actualizar la lista
                    gestionar();
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              };
            });
          });
        } else {
          console.error(
            "La respuesta no contiene un array de productos disponibles."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("Error al consultar los productos: " + error);
  }
}

confirmar();