export function registrarCompra(id_usuario, total_pagar, productosComprar) {
    
  
    const guardarCompra = `INSERT INTO compras
            (id_usuario, precio_total, fecha_compra, estado, productos, fecha_creada) VALUES
  ('${id_usuario}', '${total_pagar}', CURRENT_TIMESTAMP, 'pendiente', '${productosComprar}', CURRENT_TIMESTAMP)`;
    return guardarCompra;
  }