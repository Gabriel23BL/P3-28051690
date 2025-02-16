export async function crearTablaCategoriasSqlite(conectar) {
    try {
      const resultado = await conectar.get(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='categorias';
      `);
  
      if (!resultado) {
        await conectar.run(`
          CREATE TABLE categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria VARCHAR(100) NOT NULL UNIQUE
          )
        `);
        console.log("Tabla de categorias creada.");
      } else {
        console.log("La tabla de categorias ya existe.");
      }
    } catch (error) {
      console.error("Error al crear la tabla de categorias:", error);
    }
  }