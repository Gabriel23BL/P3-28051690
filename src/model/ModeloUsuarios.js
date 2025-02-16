import { conexion } from "../db/database.js";
import { conexionSqlite } from "../db/databaseSqlite.js";
import {
  guardarUsuario,
  datosUsuarioActivo,
  inicioSesionDatos,
  existeUsuario,
  tokenComprobar,
  obtenerClaveParaCambiarla, claveCambiadaUsuarioLogueado, userAutorizado,
  tokenValidar, tokenValidando, autenticoUsuario, usuarioId,
  claveCambiarLoggueado
} from "../sql/UsuariosSentencias.js";


export class ModeloUsuarios {
  /** La funcion registrarEmpleado de encarga de guardar el nuevo empleado */
static async registrarUsuario(cedula, nombre, apellido, correo, clave, token) {
    return new Promise((resolve) => {
        const guardarNuevoUsuario = conexionSqlite.run(guardarUsuario(cedula, nombre, apellido, correo, clave, token));
        guardarNuevoUsuario.then((data) => {
          resolve(data)
        }).catch((error) => {
          console.log(error);          
          resolve(false)
        });
    });
}

static async usuarioExiste(campo) {
  return new Promise((resolve) => {
    const consultadoDisponibilidadUsuario = conexionSqlite.all(existeUsuario(campo)); 
    consultadoDisponibilidadUsuario.then((data) => {
      resolve(data[0])
    }).catch((error) => {
      resolve(false)
    });
    
  });
}

static async usuarioAutorizado(correo) {
  return new Promise((resolve) => {
    const tienePermisoIniciarSesion = conexionSqlite.all(userAutorizado(correo));
    tienePermisoIniciarSesion.then((data) => {
      if (data[0].validar === 'false') {
        resolve(false);
      } else {
        resolve(data[0]);
      }
      
    }).catch((error) => {
      resolve(false)
    });
  });
}

static async tokenValidarUsuario(correo) {
  return new Promise((resolve) => {
    const tokenValidarUsuario = conexionSqlite.all(tokenValidar(correo));
    tokenValidarUsuario.then((data) => {
        resolve(data[0]);      
    }).catch((error) => {
      resolve(false)
    });
  });
}

static async autenticandoUsuario(token) {
  return new Promise((resolve) => {
    const tokenValidarUsuario = conexionSqlite.all(tokenValidando(token));
    tokenValidarUsuario.then((data) => {
        resolve(data[0]);      
    }).catch((error) => {
      resolve(false)
    });
  });
}

static async usuarioYaAutenticado(token) {
  return new Promise((resolve) => {
    const authUsuario = conexionSqlite.run(autenticoUsuario(token));
    authUsuario.then((data) => {
        resolve(data);      
    }).catch((error) => {
      resolve(false)
    });
  });
}

static async datosInicioSesion(correo) {
  return new Promise((resolve) => {
    const datosInicioSesion = conexionSqlite.all(inicioSesionDatos(correo));
    datosInicioSesion.then((data) => {
      resolve(data[0]);
    }).catch((error) => {
      resolve(false)
    });
  });
}

static async usuarioActivo(correo) {
  return new Promise((resolve) => {
    const datosUserActivo = conexionSqlite.all(datosUsuarioActivo(correo));
    datosUserActivo.then((data) => {
      resolve(data[0]);
    }).catch((error) => {
      resolve(false)
    });
  });
}





static async idUsuarioRegistra(correo) {
  return new Promise((resolve) => {
    const idUsuario = conexionSqlite.all(usuarioId(correo));
    idUsuario.then((data) => {
      resolve(data[0]);
    }).catch((error) => {
      resolve(false)
    });
  });
}
  





static async cambiarClaveLoggueado(clave, id_usuario) {
  return new Promise((resolve) => {
      const cambiandoClave = conexionSqlite.run(claveCambiarLoggueado(clave, id_usuario));
      cambiandoClave.then((data) => {
        resolve(data)
      }).catch((error) => {
        console.log(error);          
        resolve(false)
      });
  });
}





  


  /** La funcion comprobarToken se encarga de verificar si el token aun no se
    usado y si es valido o no */
  static async comprobarToken(token) {
    return new Promise((resolve) => {
      conexion.query(tokenComprobar(token), function (error, resultado) {
        if (!error) {
          resolve(resultado.rows[0]);
        } else {
          resolve(false);
        }
      });
    });
  }

 

/** La funcion obtenerClaveActual se encarga de traer la clave de un usuario
  logueado, la misma servira para registrar una nueva clave de acceso */
    static async obtenerClaveActual(correo) {
      return new Promise((resolve) => {
        conexion.query(obtenerClaveParaCambiarla(correo), function (error, resultado) {
          if (!error) {
            resolve(resultado.rows[0]);
          } else {
            resolve(false);
          }
        });
      });
    }


    /** La funcion claveCambiadaUsuarioLogueado guardara la nueva clave que
      el usuario cambio */
  static async claveCambiadaUsuarioLogueado(clave, correo) {
    return new Promise((resolve) => {
      conexion.query(claveCambiadaUsuarioLogueado(clave, correo),
        function (error, resultado) {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

}
