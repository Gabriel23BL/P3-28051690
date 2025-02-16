import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
import { crearTablaUsuariosSqlite } from "../db_tablas/tablaUsuarios.js";
import { crearTablaProductosSqlite } from "../db_tablas/tablaProductos.js";
import { crearTablaComprasSqlite } from "../db_tablas/tablaCompras.js";

dotenv.config();

const nombreDB = process.env.DB || "programacionIII";

export const conexionSqlite = await open({
  filename: `./src/db_tablas/${nombreDB}.db`,
  driver: sqlite3.Database,
});

async function crearBaseDeDatos() {
  try {
    //console.log('Base de datos abierta/creada...');
    await conectarBaseDeDatos();
  } catch (error) {
    console.log("Error al abrir la base de datos:", error);
  }
}

async function conectarBaseDeDatos() {
  try {
    await conexionSqlite.exec("PRAGMA foreign_keys = ON;");
    //console.log('Base de datos seleccionada: ' + nombreDB);
    await crearTablaUsuariosSqlite(conexionSqlite); // Pasar la conexión a la función crearTablaUsuariosSqlite
    await crearTablaProductosSqlite(conexionSqlite);
    await crearTablaComprasSqlite(conexionSqlite);
  } catch (error) {
    console.log("Error al seleccionar la base de datos:", error);
  }
}

export async function conectar() {
  try {
    await conexionSqlite;
    console.log("Base de datos conectada con éxito...");
    await crearBaseDeDatos();
  } catch (error) {
    console.log("Error al conectar la base de datos:", error);
  }
}
