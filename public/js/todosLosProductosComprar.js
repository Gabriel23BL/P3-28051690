
import { direccionLocal } from "./constantes.js";

export function todosProductosDisponibles() {
  try {
    fetch(`${direccionLocal}/api/productos-disponibles`, {
      method: "GET",
      credentials: "include", // Esto incluye las cookies con la solicitud
    })
      .then((response) => response.json())
      .then((data) => {
        let gammaAltaContent = ""; // Variable para acumular el contenido de gamma alta
        let gammaMediaContent = ""; // Variable para acumular el contenido de gamma media
        let gammaBajaContent = "";

        data.productosDisponibles.forEach((element) => {
          let cardContent = `
      <div class="card px-5">
          <div
            id="${element.id}" 
            class="product"
            data-codigo="${element.codigo}"
            data-name="${element.producto}"
            data-price="${element.precio}"
            data-image="${element.imagen}"
          >
            <img
              src="${element.imagen}"
              class="card-img-top mt-5"
              alt="${element.producto}"
            />
            <div class="card-body">
              <h5 class="card-title">${element.producto}</h5>
              <!--Caracteristicas-->

              <div>
                <i class="bi bi-upc-scan">  ${element.codigo}</i>
              </div>

              <div>
                <i class="bi bi-check2-square">  ${
                  element.existencia_actual == 1 ? "Disponible" : "Agotado"
                }</i>
              </div>

              <div>
                <i class="bi bi-currency-dollar">  ${element.precio}</i>
              </div>
            </div>

            <button class="add-to-cart btn btn-success btn-lg">
                Agregar al <i class="bi bi-cart4"></i>
            </button>
            </div>
          </div>
        </div>
      `;

          if (element.id_categoria == 1) {
            gammaAltaContent += cardContent;
          } else if (element.id_categoria == 2) {
            gammaMediaContent += cardContent;
          } else {
            gammaBajaContent += cardContent;
          }
        });

        document.getElementById("gamma-alta").innerHTML = gammaAltaContent; // Asigna el contenido de gamma alta
        document.getElementById("gamma-media").innerHTML = gammaMediaContent; // Asigna el contenido de gamma media
        document.getElementById("gamma-baja").innerHTML = gammaBajaContent;

        document.querySelectorAll(".add-to-cart").forEach((button) => {
          button.addEventListener("click", addToCart);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("Error al consultar los productos: " + error);
  }
}







let carrito = [];

function addToCart(event) {
  const productElement = event.target.closest(".product");
  const productId = productElement.id; // Obtener el id directamente
  const productCodigo = productElement.getAttribute("data-codigo");
  const productName = productElement.getAttribute("data-name");
  const productPrice = parseFloat(productElement.getAttribute("data-price"));
  const productImage = productElement.getAttribute("data-image");

  const producto = {
    id: productId,
    codigo: productCodigo,
    nombre: productName,
    precio: productPrice,
    imagen: productImage,
  };

  carrito.push(producto);
  actualizarVistaCarrito();
}

function eliminarDelCarrito(productId) {
  carrito = carrito.filter(producto => producto.id !== productId);
  actualizarVistaCarrito();
}









let totalPagar = 0;
function actualizarVistaCarrito() {
  let carritoContent = "";
  totalPagar = 0; // Reiniciar el total a pagar antes de recalcular

  carrito.forEach((producto) => {
    totalPagar += producto.precio;
    carritoContent += `
            <div class="cart-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="cart-details">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.precio}</p>
                    <button class="remove-from-cart btn btn-danger" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>`;
  });

  document.getElementById("carrito-vista").innerHTML = carritoContent;
  document.getElementById("total-price").innerHTML = `${totalPagar.toFixed(2)}`;

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      eliminarDelCarrito(productId);
    });
  });

  document.getElementById("checkout-button").addEventListener("click", () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "/finalizar-compras"; // Redirige a la vista finalizarCompra
  });
}