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

/** 
export async function crearTablaUsuariosSqlite(conectar) {
  try {
    await conectar.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    token VARCHAR(16),
    clave VARCHAR(100),
    validar BOOLEAN,
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tabla de usuarios creada/verificada...");
  } catch (error) {
    console.log("Error al crear la tabla de usuarios:", error);
  }
}
*/
 
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


/** 
export async function crearTablaUsuarios() {
  const tablaUsuarios = "usuarios";
  const consultaCrearTabla = `
   id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    token VARCHAR(16),
    clave VARCHAR(100),
    validar BOOLEAN,
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `;

  const consultaVerificarTabla = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = '${tablaUsuarios}'
    );
  `;

  try {
    const client = await conexion.connect();
    const resultadoVerificacion = await client.query(consultaVerificarTabla);
    const existeTabla = resultadoVerificacion.rows[0].exists;

    if (existeTabla) {
      //console.log(`La tabla ${tablaEmpleados} ya existe.`);
    } else {
      await client.query(consultaCrearTabla);
      console.log(`Tabla: ${tablaUsuarios} creada...`);
    }

    client.release();
  } catch (error) {
    console.log("Error al crear la tabla:", error);
  }
}
*/
