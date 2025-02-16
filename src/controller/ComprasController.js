import { ModeloCompras } from "../model/ModeloCompras.js";
import { ModeloUsuarios } from "../model/ModeloUsuarios.js";
import { Tokens } from "../services/tokens.js";

export class ComprasControlador {
  static async realizarCompra(req, res) {
    try {
      const { productosComprados, total_pagar} = req.body;

      const token = req.cookies.programacioniii;

      const descifrarToken = Tokens.descifrarToken(token);

      if (descifrarToken.status === "error") {
        return res.status(400).json({
          status: descifrarToken.status,
          numero: descifrarToken.numero,
          message: descifrarToken.message,
        });
      }
      
      const id_usuario = await ModeloUsuarios.idUsuarioRegistra(descifrarToken.correo);

      const compraRealizada = await ModeloCompras.guardarNuevaCompra(id_usuario.id, total_pagar, productosComprados);

      if (!compraRealizada) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, no se realizo la compra...",
        });
      } else {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Compra realizada con exito...",
        });
      }
      
    } catch (error) {
      console.log("Error, al cerrar sesion: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, al cerrar sesion...",
      });
    }
  }
}
