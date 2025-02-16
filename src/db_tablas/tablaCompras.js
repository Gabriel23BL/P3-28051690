export async function crearTablaComprasSqlite(conectar) {
  try {
    const resultado = await conectar.get(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='compras';
      `);

    if (!resultado) {
      await conectar.run(`CREATE TABLE compras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        precio_total DECIMAL(10, 2) NOT NULL,
        fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
        estado VARCHAR(50) NOT NULL,
        productos JSON NOT NULL,
        fecha_creada DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
      )`);
      console.log("Tabla de compras creada.");
    } else {
      console.log("La tabla de compras ya existe.");
    }
  } catch (error) {
    console.error("Error al crear la tabla de compras:", error);
  }
}
