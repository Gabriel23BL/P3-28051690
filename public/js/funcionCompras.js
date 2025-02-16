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


