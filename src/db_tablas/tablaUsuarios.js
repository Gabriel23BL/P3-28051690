import { conexion } from "../db/database.js";

export async function crearTablaUsuariosSqlite(conectar) {
  try {
    const resultado = await conectar.get(`
      SELECT name 
      FROM sqlite_master 
      WHERE type='table' AND name='usuarios';
    `);

    if (!resultado) {
      await conectar.run(`
        CREATE TABLE usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cedula VARCHAR(20) NOT NULL UNIQUE,
          nombre VARCHAR(50) NOT NULL,
          apellido VARCHAR(50) NOT NULL,
          correo VARCHAR(100) UNIQUE,
          token VARCHAR(16),
          clave VARCHAR(100),
          validar BOOLEAN,
          tipo_usuario VARCHAR(50),
          fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Tabla de usuarios creada.");
    }
  } catch (error) {
    console.log("Error al crear la tabla de usuarios:", error);
  }
}


 
export function crearTablaUsuariosLocal() {
  const tablaUsuarios = "usuarios";
  const consulta = `CREATE TABLE IF NOT EXISTS ${tablaUsuarios} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    token VARCHAR(16),
    clave VARCHAR(100),
    validar BOOLEAN,
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  conexion.query(consulta, (error, results) => {
    if (error) {
      console.log("Error al crear la tabla:", error);
    } else {
      //console.log(`Tabla: ${tablaEmpleados} creada/verificada...`);
    }
  });
}


