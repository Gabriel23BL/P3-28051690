/** guardarUsuario es la sentencia sql para registrar un usuario */
export function guardarUsuario(cedula, nombre, apellido, correo, clave, token) {
  const registrarEmpleado = `INSERT INTO usuarios(cedula, nombre, apellido, correo, token, clave, validar, tipo_usuario, fecha_creado) VALUES ('${cedula}', '${nombre}', '${apellido}', '${correo}', '${token}', '${clave}', 'false', 'cliente', CURRENT_TIMESTAMP)`;
  return registrarEmpleado;
}

export function userAutorizado(correo) {
  const usuarioActivo = `SELECT validar, clave FROM usuarios WHERE correo = '${correo}'`;
  return usuarioActivo;
}

export function tokenValidar(correo) {
  const validarToken = `SELECT token, nombre FROM usuarios WHERE correo = '${correo}'`;
  return validarToken;
}

export function tokenValidando(token) {
  const validandoToken = `SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS token_valido FROM usuarios WHERE token = '${token}'`;
  return validandoToken;
}

export function autenticoUsuario(token) {
  const usuarioSeAutentico = `UPDATE usuarios SET validar = true WHERE token = '${token}'`;
  return usuarioSeAutentico;
}

/** existeUsuario es la sentencia sql para consultar si existe o no un Usuario*/
export function existeUsuario(campo) {
  let usuarioExiste;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexCorreo.test(campo)) {
    usuarioExiste = `SELECT COUNT(*) as count FROM usuarios WHERE correo = '${campo}'`;
  } else {
    usuarioExiste = `SELECT COUNT(*) as count FROM usuarios WHERE cedula = '${campo}'`;
  }

  return usuarioExiste;
}

/** inicioSesionDatos es la sentencia sql para traer los datos para el 
  inicio de sesion */
export function inicioSesionDatos(correo) {
  const usuarioActivo = `SELECT id, correo, clave, tipo_usuario FROM usuarios WHERE correo = '${correo}'`;
  return usuarioActivo;
}


/** datosUsuarioActivo es la sentencia sql para consultar datos del user activo*/
export function datosUsuarioActivo(correo) {
  const usuarioActivo = `SELECT id, nombre, tipo_usuario, correo FROM usuarios WHERE correo = '${correo}'`;
  return usuarioActivo;
}

export function usuarioId(correo) {
  const idUsuario = `SELECT id FROM usuarios WHERE correo = '${correo}'`;
  return idUsuario;
}


export function claveCambiarLoggueado(clave, id_usuario) {
  const cambiarClaveLoggueado = `UPDATE usuarios SET clave = '${clave}' WHERE id = '${id_usuario}'`;
  return cambiarClaveLoggueado;
}










/** existeEmpleado es la sentencia sql para consultar si existe o no un empleado*/
export function tokenComprobar(token) {
  const comprobarToken = `
    SELECT 
      CASE 
        WHEN COUNT(*) = 0 THEN 2
        WHEN BOOL_OR(validar = false) THEN 1
        ELSE 0
      END as result 
    FROM empleados 
    WHERE token = '${token}';
  `;
  return comprobarToken;
}

/** guardarEmpleado es la sentencia sql para registrar un empleado */
export function claveEmpleadoCrear(clave, token) {
  const crearClaveEmpleado = `UPDATE empleados SET clave = '${clave}', validar = 'true', fecha_clave_creada = NOW() WHERE token = '${token}'`;
  return crearClaveEmpleado;
}

/** obtenerClaveParaCambiarla es la sentencia sql para consultar una clave y
  compararla de manera que si es correcta se pueda hacer el cambio de clave */
export function obtenerClaveParaCambiarla(correo) {
  const claveCambiar = `SELECT clave FROM empleados WHERE correo = '${correo}'`;
  return claveCambiar;
}

/** claveCambiadaUsuarioLogueado es la sentencia sql para cambiar la clave de
  un usuario cuando el mismo este logueado */
export function claveCambiadaUsuarioLogueado(clave, correo) {
  const claveCambiada = `UPDATE empleados SET clave = '${clave}' WHERE correo = '${correo}'`;
  return claveCambiada;
}

/** empleadosTodos es la sentencia sql para consultar todos los empleados */
export function empleadosTodos(correo) {
  const todosEmpleados = `SELECT id, cedula, correo, direccion, estado, fecha_ingreso, fecha_creado, municipio, parroquia, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, tipo_usuario FROM empleados ORDER BY cedula ASC`;
  return todosEmpleados;
}

/** La funcion usuarioAutenticado se encarga de autenticar el usuario para poder
    iniciar sesion y guardar la fecha en la que se autentico */
export function usuarioAutenticado(token) {
  let authUsuario = `UPDATE usuario SET autenticar = 'true', fvalidado = NOW() WHERE token = '${token}'`;
  return authUsuario;
}

/** La funcion cambioClaveUsuario cambia la clave desde una clave existente */
export function cambioClaveUsuario(correo, clave) {
  let cambioClave = `UPDATE usuario SET clave = '${clave}' WHERE correo = '${correo}'`;
  return cambioClave;
}

/** La funcion saveTokenCambioClave guarda un token solicitado para el cambio
      de clave */
export function saveTokenCambioClave(correo, token) {
  let guardarTokenCambioClave = `INSERT INTO tokens(token, correo, utilizado, fsolicitud, vencido) VALUES ('${token}', '${correo}', 'false', NOW(), 'false')`;
  return guardarTokenCambioClave;
}
