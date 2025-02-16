import { conexionSqlite } from "../db/databaseSqlite.js";
import {
  registrarProductoVersionUno,
  registrarProductoVersionDos,
  disponiblesProductos, productoActualizado,
  productoEliminado
} from "../sql/ProductosSentencias.js";

export class ModeloProductos {
  static async guardarNuevoProducto(req, idUsuario) {
    return new Promise((resolve) => {
      const { version } = req.body;

      const guardarProductoUno = conexionSqlite.run(
        registrarProductoVersionUno(req, idUsuario)
      );

      guardarProductoUno.then((data) => {
        resolve(data)
      }).catch((error) => {
        console.log(error);          
        resolve(false)
      });
    });
  }

  static async productosDisponibles() {
    return new Promise((resolve) => {
      const todosProductos = conexionSqlite.all(disponiblesProductos());
      todosProductos.then((data) => {
        resolve(data);
      }).catch((error) => {
        resolve(false)
      });
    });
  }

  static async actualizarUnProducto(id, id_usuario, producto, codigo, precio) {
    return new Promise((resolve) => {
      const updateUnProducto = conexionSqlite.run(productoActualizado(id, id_usuario, producto, codigo, precio));
      updateUnProducto.then((data) => {
        resolve(data);
      }).catch((error) => {
        resolve(false)
      });
    });
  }



  static async eliminarUnProducto(id) {
    return new Promise((resolve) => {
      const deleteUnProducto = conexionSqlite.run(productoEliminado(id));
      deleteUnProducto.then((data) => {
        resolve(data);
      }).catch((error) => {
        resolve(false)
      });
    });
  }


}

