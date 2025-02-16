import bcryptjs from "bcryptjs";
import { Tokens } from "../services/tokens.js";
import { ModeloUsuarios } from "../model/ModeloUsuarios.js";
import { EnviarCorreo } from "../services/sendMailValEmpleado.js";


export class LoginControlador {
  static async iniciarSesion(req, res) {
    try {
      const correo = req.body.correo;
      const clave = req.body.clave;

      const existeUsuario = await ModeloUsuarios.usuarioExiste(correo);

      if (existeUsuario.count === 0) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Credenciales invalidas...",
        });
      }

      const authUsuario = await ModeloUsuarios.usuarioAutorizado(correo);

      if (!authUsuario) {
        const tokenValidarUsuario = await ModeloUsuarios.tokenValidarUsuario(
          correo
        );

        const tokenUnicoValidarEmpleado = tokenValidarUsuario.token;
        const nombre = tokenValidarUsuario.nombre;

        EnviarCorreo.sendMailCrearClave(
          correo,
          nombre,
          tokenUnicoValidarEmpleado
        );

        return res.status(400).json({
          status: "error",
          message: "Valide su correo...",
        });
      }

      const resultado = authUsuario && authUsuario.clave;
      const comparada = await bcryptjs.compare(clave, resultado);

      if (comparada) {
        const token = Tokens.tokenInicioSesion(correo);

        return res
          .cookie("programacioniii", token.token, token.cookieOption)
          .json({
            status: "ok",
            message: "usuario logueado",
            redirect: "/comprar-productos",
          });
      } else {
        return res.status(400).json({
          status: "error",
          message: "Credenciales invalidas...",
        });
      }
    } catch (error) {
      console.log("Error, al intentar iniciar sesion: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, no se pudo iniciar sesion...",
      });
    }
  }

  static async cerrarSesion(req, res) {
    try {
      res.clearCookie("programacioniii");

      return res.status(201).json({
        status: "ok",
        numero: 1,
        message: "Cerrando sesion...",
        redirect: "/",
      });
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
