import { conexionSqlite } from "../db/databaseSqlite.js";
import { registrarCompra } from "../sql/ComprasSentencias.js";

export class ModeloCompras {
  static async guardarNuevaCompra(id_usuario, total_pagar, productosComprar) {
    return new Promise((resolve) => {

      const guardarCompra = conexionSqlite.run(registrarCompra(id_usuario, total_pagar, productosComprar));

      guardarCompra.then((data) => {
        resolve(data)
      }).catch((error) => {
        console.log(error);          
        resolve(false)
      });
    });
  }

}