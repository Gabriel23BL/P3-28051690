import { direccionLocal } from "./constantes.js";

document.addEventListener('DOMContentLoaded', () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function actualizarVistaCarrito() {
      let carritoContent = '';
      let totalPagar = 0;

      carrito.forEach(producto => {
          totalPagar += producto.precio; // Asegúrate de que producto.precio sea un número
          carritoContent += `
              <div id="${producto.id}" class="cart-item">
                  <img src="${producto.imagen}" alt="${producto.nombre}">
                  <div class="cart-details">
                      <h5>${producto.nombre}</h5>
                      <p>${producto.precio.toFixed(2)}</p> <!-- Formato de precio -->
                  </div>
              </div>`;
      });

      document.getElementById('carrito-vista').innerHTML = carritoContent;
      document.getElementById('total-price').innerHTML = `${totalPagar.toFixed(2)}`;
  }

  actualizarVistaCarrito();

  document.querySelector('#compra-form').addEventListener('submit', (event) => {
    event.preventDefault();
    finalizarCompra();
  });

  function finalizarCompra() {
    const referenciaBancaria = document.querySelector('#referencia').value;
    console.log('Referencia bancaria:', referenciaBancaria);

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total_pagar = document.getElementById('total-price').innerText;

    const productosComprados = carrito.map(producto => ({
      id: producto.id,
      codigo: producto.codigo,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio
    }));

    fetch(`${direccionLocal}/api/realizar-compra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productosComprados: productosComprados,
        total_pagar: total_pagar
      }),
      credentials: "include",
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la compra: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          console.log('Compra exitosa...');
          
          const detallesCompra = {
            productosComprados: productosComprados,
            total_pagar: total_pagar,
            referenciaBancaria: referenciaBancaria,
            estado: 'Aprobada'
          };
          localStorage.setItem('detallesCompra', JSON.stringify(detallesCompra));
          
          setTimeout(() => {
            localStorage.removeItem('carrito'); 
            window.location.href = '/confirmarCompra'; 
          }, 3000);
        } else {
          console.log('Error al comprar...');
          const detallesCompra = {
            productosComprados: productosComprados,
            total_pagar: total_pagar,
            referenciaBancaria: referenciaBancaria,
            estado: 'Rechazada'
          };
          localStorage.setItem('detallesCompra', JSON.stringify(detallesCompra));
        } 
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }
});

// confirmar compra

document.addEventListener('DOMContentLoaded', () => {
  const detallesCompra = JSON.parse(localStorage.getItem('detallesCompra'));
  if (detallesCompra) {
    const detallesDiv = document.getElementById('detalles-compra');
    let detallesHTML = `
      <h3>Estado de la compra: ${detallesCompra.estado}</h3>
      <p>Referencia bancaria: ${detallesCompra.referenciaBancaria}</p>
      <p>Total pagado: $${detallesCompra.total_pagar}</p>
      <h4>Productos comprados:</h4>
      <ul>
    `;
    detallesCompra.productosComprados.forEach(producto => {
      detallesHTML += `
        <li>
          <img class="w-20 h-30 mt-2 mb-2" src="${producto.imagen}" alt="${producto.nombre}"  >
          <span>${producto.nombre} - $${producto.precio}</span>
        </li>
      `;
    });
    detallesHTML += '</ul>';
    detallesDiv.innerHTML = detallesHTML;
  }
});