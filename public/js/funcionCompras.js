// Función para manejar la compra
function comprar(productos) {
    // Iterar sobre los productos y mostrar sus detalles en la consola
    productos.forEach(producto => {
        console.log
        (`
            ID: ${producto.id},
            Código: ${producto.codigo}, 
            Nombre: ${producto.nombre}, 
            Precio: $${producto.precio.toFixed(2)}
        `);
    });
}

// // Evento para el botón de compra
// document.getElementById('checkout-button').addEventListener('click', () => {
//     // Obtener el carrito desde localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Llamar a la función comprar con los datos del carrito
//     comprar(cart);
// });

