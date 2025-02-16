export function validarCampos(req) {
  const cedulaRegex = /^[1-9][0-9]{4,7}$/;
  const nombresApellidosRegex =
    /^[a-zA-Zà-ÿÀ-Ÿ\u00f1\u00d1\u00e7\u00c7]+([ '-][a-zA-Zà-ÿÀ-Ÿ\u00f1\u00d1\u00e7\u00c7]+)*$/;
  const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const claveRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{5,16}$/;

  const { cedula, nombre, apellido, correo, claveUno, claveDos } = req.body;

  const camposObligatorios = [
    { campo: cedula, nombre: "cedula" },
    { campo: nombre, nombre: "nombre" },
    { campo: apellido, nombre: "apellido" },
    { campo: correo, nombre: "correo" },
    { campo: claveUno, nombre: "claveUno" },
    { campo: claveDos, nombre: "claveDos" },
  ];

  for (let i = 0; i < camposObligatorios.length; i++) {
    if (!camposObligatorios[i].campo) {
      return {
        status: "error",
        numero: 0,
        message: `El campo ${camposObligatorios[i].nombre} está vacío...`,
      };
    }
  }

  if (!cedulaRegex.test(cedula)) {
    return {
      status: "error",
      numero: 0,
      message: "Cédula inválida...",
    };
  }

  if (!nombresApellidosRegex.test(nombre)) {
    return {
      status: "error",
      numero: 0,
      message: "Nombre inválido...",
    };
  }

  if (!nombresApellidosRegex.test(apellido)) {
    return {
      status: "error",
      numero: 0,
      message: "Apellido inválido...",
    };
  }

  if (!correoRegex.test(correo)) {
    return {
      status: "error",
      numero: 0,
      message: "Correo inválido...",
    };
  }

  if (claveUno !== claveDos) {
    return {
      status: "error",
      numero: 0,
      message: "Claves no coinciden...",
    };
  }

  
    if (claveUno.length < 5 || claveUno.length > 16) {
      return {
        status: "error",
        numero: 0,
        message: "Clave debe ser entre 5 y 16 caracteres...",
      };
    }

    if (claveDos.length < 5 || claveDos.length > 16) {
      return {
        status: "error",
        numero: 0,
        message: "Clave debe ser entre 5 y 16 caracteres...",
      };
    }

   /**  
    const claveValida = claveRegex.test(claveUno);
    if (!claveValida) {
      return {
        status: "error",
        numero: 0,
        message: "Formato de clave invalida...",
      };
    }
  */

  return {
    status: "ok",
    numero: 1,
    message: "Campos válidos",
  };
}
