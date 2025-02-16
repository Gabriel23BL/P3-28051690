import { direccionLocal } from "./constantes.js";

export function gestionar() {
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
        //console.log(data); // Verifica la estructura de los datos
        let productosContent = ""; // Variable para acumular el contenido de productos

        // Asegúrate de que data.productosDisponibles sea un array
        if (Array.isArray(data.productosDisponibles)) {
          data.productosDisponibles.forEach((element) => {
            // Agrega solo una fila a la tabla
            let rowContent = `
                        <tr>
                            <td>${element.id}</td>
                            <td>${element.producto}</td>
                            <td>${element.codigo}</td>
                            <td>${element.precio}</td>
                            <td>
                             <button class="btn btn-primary edit-btn m1-5 mt-1 t" 
                               data-id="${element.id}">
                               Editar
                             </button>

                             <button class="btn btn-danger delete-btn mb-1 mt-1"
                               data-id="${element.id}">
                               Eliminar
                              </button>
                            </td>
                        </tr>
                    `;
            productosContent += rowContent; // Acumula el contenido de cada producto
          });

          // Inserta el contenido acumulado en el contenedor
          document.getElementById("productos-container").innerHTML =
            productosContent;

          // Agregar eventos a los botones de editar
          document.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", function () {
              const productId = this.getAttribute("data-id");
              //console.log(`Editar producto con ID: ${productId}`); // Depuración

              // Lógica para obtener los datos del producto
              const product = data.productosDisponibles.find(
                (p) => p.id == productId
              );
              //console.log(product); // Depuración

              if (product) {
                // Cargar los datos del producto en el modal
                document.getElementById("productName").value = product.producto;
                document.getElementById("productCode").value = product.codigo;
                document.getElementById("productPrice").value = product.precio;
                document.getElementById("productId").value = product.id;

                // Mostrar el modal
                $("#editModal").modal("show");
              }
            });
          });

          // Guardar cambios
          document
            .getElementById("saveChanges")
            .addEventListener("click", function () {
              const id = document.getElementById("productId").value;
              const updatedProduct = {
                producto: document.getElementById("productName").value,
                codigo: document.getElementById("productCode").value,
                precio: document.getElementById("productPrice").value,
              };

              // Lógica para enviar los datos actualizados a la API
              fetch(`${direccionLocal}/api/update-producto/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
                credentials: "include",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      "Error al actualizar el producto: " + response.statusText
                    );
                  }
                  // Cerrar el modal
                  $("#editModal").modal("hide");
                  // Volver a cargar la lista de productos
                  gestionar();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });

          // Agregar eventos a los botones de eliminar
          document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
              const productId = this.getAttribute("data-id");

              //console.log(`Eliminar producto con ID: ${productId}`);

              // Mostrar el modal de confirmación
              $("#deleteModal").modal("show");

              // Configurar el botón de confirmación para eliminar el producto
              document.getElementById("confirmDelete").onclick = function () {
                fetch(`${direccionLocal}/api/delete-producto/${productId}`, {
                  method: "PUT",
                  credentials: "include",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error(
                        "Error al eliminar el producto: " + response.statusText
                      );
                    }
                    $("#deleteModal").modal("hide");
                    // Si la eliminación fue exitosa, puedes volver a llamar a gestionar() // para actualizar la lista
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

gestionar();
