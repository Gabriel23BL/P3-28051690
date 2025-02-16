import { conexion } from "../db/conexion.js";

export async function crearTablaFondos() {
  const tablaFondos = "fondos";
  const consultaCrearTabla = `
    SET search_path TO public;
    CREATE TABLE IF NOT EXISTS ${tablaFondos} (
      id SERIAL PRIMARY KEY,
      cedula VARCHAR(8) NOT NULL,
      correo VARCHAR(100) NOT NULL,
      monto VARCHAR(4) NOT NULL,
      confirmado BOOLEAN,
      retirado BOOLEAN,
      fecha_retiro TIMESTAMP WITH TIME ZONE,
      fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const consultaVerificarTabla = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = '${tablaFondos}'
    );
  `;

  try {
    const client = await conexion.connect();
    const resultadoVerificacion = await client.query(consultaVerificarTabla);
    const existeTabla = resultadoVerificacion.rows[0].exists;

    if (existeTabla) {
      //console.log(`La tabla ${tablaFondos} ya existe.`);
    } else {
      await client.query(consultaCrearTabla);
      console.log(`Tabla: ${tablaFondos} creada...`);
    }

    client.release();
  } catch (error) {
    console.log("Error al crear la tabla:", error);
  }
}
