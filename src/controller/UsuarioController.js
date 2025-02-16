import bcryptjs from "bcryptjs";
import { validarCampos } from "../utils/validarCamposUsuarios.js";
import { Tokens } from "../services/tokens.js";
import { ModeloUsuarios } from "../model/ModeloUsuarios.js";
import { EnviarCorreo } from "../services/sendMailValEmpleado.js";

/** La clase UsuarioControlador se encarga de los procesos que hace el usuario */
export class UsuarioControlador {
  static async guardarNuevoUsuario(req, res) {
    try {
      const { cedula, nombre, apellido, correo, claveUno, claveDos } = req.body;

      const camposValidados = validarCampos(req);

      if (camposValidados.status === "error") {
        return res.status(400).json({
          status: camposValidados.status,
          numero: camposValidados.numero,
          message: camposValidados.message,
        });
      }

      const existeUsuario = await ModeloUsuarios.usuarioExiste(cedula);

      if (existeUsuario.count === 1) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, usuario ya existe...",
        });
      }

      const encriptado = await bcryptjs.genSalt(5);
      const claveEncriptada = await bcryptjs.hash(claveUno, encriptado);
      const tokenUnicoValidarEmpleado = Tokens.tokenValidarUsuario(10);

      const usuarioCreado = await ModeloUsuarios.registrarUsuario(
        cedula,
        nombre,
        apellido,
        correo,
        claveEncriptada,
        tokenUnicoValidarEmpleado
      );

      if (!usuarioCreado) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, usuario ya existe...",
        });
      } else {
        EnviarCorreo.sendMailCrearClave(
          correo,
          nombre,
          tokenUnicoValidarEmpleado
        );
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Usuario creado con exito...",
          redirect: "/login",
        });
      }
    } catch (error) {
      console.log("Error, al registar cliente: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, no se guardo el usuario...",
      });
    }
  }

  static async comprobarTokenParaValidarlo(req, res) {
    try {
      const url = req.body.url;
      const parts = url.split("/");
      const token = parts[parts.length - 1];

      const autenticandoUsuario = await ModeloUsuarios.autenticandoUsuario(
        token
      );

      if (autenticandoUsuario.token_valido === 0) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, token no existe...",
        });
      }

      const usuarioAutenticado = await ModeloUsuarios.usuarioYaAutenticado(
        token
      );

      if (!usuarioAutenticado) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, token invalido...",
        });
      } else {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Usuario autenticado con exito...",
        });
      }
    } catch (error) {
      console.log("Error, al comprobar token de validar: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, al comprobar token de validar...",
      });
    }
  }

  static async usuarioActivo(req, res) {
    try {
      const token = req.cookies.programacioniii;
      const descifrarToken = Tokens.descifrarToken(token);

      if (descifrarToken.status === "error") {
        return res.status(400).json({
          status: descifrarToken.status,
          numero: descifrarToken.numero,
          message: descifrarToken.message,
        });
      }

      const datosUsuarioActivo = await ModeloUsuarios.usuarioActivo(descifrarToken.correo);
      
      if (!datosUsuarioActivo) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, no hay usuario activo...",
        });
      } else {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Usuario activo...",
          usuarioActivo: datosUsuarioActivo
        });
      }
    } catch (error) {
      console.log("Error, al consulta usuario activo: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, al consulta usuario activo...",
      });
    }
  }

  static async cambiarClaveLoggueado(req, res) {
    try {
      const token = req.cookies.programacioniii;
      const { claveVieja, claveNuevaUno, clavNuevaDos } = req.body;

      const descifrarToken = Tokens.descifrarToken(token);

      if (descifrarToken.status === "error") {
        return res.status(400).json({
          status: descifrarToken.status,
          numero: descifrarToken.numero,
          message: descifrarToken.message,
        });
      }

      if (claveNuevaUno !== clavNuevaDos) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, claves no coinciden...",
        });
      }

      const claveViejaGuardada = await ModeloUsuarios.datosInicioSesion(descifrarToken.correo);
      
      const comparada = await bcryptjs.compare(claveVieja, claveViejaGuardada.clave);

     
      if (!comparada) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, clave vieja no coincide...",
        });
      } else {
        const encriptado = await bcryptjs.genSalt(5);
        const claveEncriptada = await bcryptjs.hash(claveNuevaUno, encriptado);

        const cambioClave = await ModeloUsuarios.cambiarClaveLoggueado(claveEncriptada, claveViejaGuardada.id);

        if (!cambioClave) {
          return res.status(400).json({
            status: "error",
            numero: 0,
            message: "Error, no se cambio la clave...",
          });
        } else {
          return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Clave cambiada con exito...",
        });
        }

        
      }
      
      
    } catch (error) {
      console.log("Error, al cambiar clave: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, al cambiar clave...",
      });
    }
  }


}


