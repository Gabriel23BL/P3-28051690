import { Router } from "express";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { UsuarioControlador } from "../controller/UsuarioController.js";
import { LoginControlador } from "../controller/LoginController.js";
import { ProductosControlador } from "../controller/ProductosController.js";
import { ComprasControlador } from "../controller/ComprasController.js";

const __filename = fileURLToPath(import.meta.url);
const rootDir  = dirname(__filename);

const __dirname = resolve(rootDir, '../');

export const rutas = Router();

/** Esta ruta /cerrar_sesion se encarga del cierre de la session */
rutas.get('/cerrar-sesion', (req, res) => {  
  res.clearCookie('programaciontres');
  res.redirect('/');     
});

/** Esta es la ruta raiz del proyecto */
rutas.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

/** /registro se encarga de mostrar la vista del registro de usuario */
rutas.get('/registro-cliente', (req, res) => {
  res.sendFile(__dirname + '/view/usuarios.html');
});

rutas.get('/gestion', (req, res) => {
  res.sendFile(__dirname + '/view/gestionProductos.html');
});

rutas.get('/confirmarCompra', (req, res) => {
  res.sendFile(__dirname + '/view/confirmarCompra.html');
});

rutas.get('/cambiar-clave', (req, res) => {
  res.sendFile(__dirname + '/view/cambiarClave.html');
});

rutas.get('/clave', (req, res) => {
  res.sendFile(__dirname + '/view/recuperarClave.html'); 
});

rutas.get('/confirmar', (req, res) => {
  res.sendFile(__dirname + '/view/confirmar.html'); 
});

/** /login se encarga de mostrar la vista para hacer login */
rutas.get('/login', (req, res) => {
  res.sendFile(__dirname + '/view/login.html'); 
});

/** /productos se encarga de mostrar la vista para ver la lista y categoria de los productos */
rutas.get('/productos', (req, res) => {
  res.sendFile(__dirname + '/view/productos.html'); 
});

rutas.get('/comprar-productos', (req, res) => {
  res.sendFile(__dirname + '/view/comprarProductos.html'); 
});

/** shop se encarga de realizar la compra */
rutas.get('/comprar', (req, res) => {
  res.sendFile(__dirname + '/view/comprar.html'); 
});


/** esta ruta se encarga de rfilalizar la compra de los articulos agg al carrito */
rutas.get('/finalizar-compras', (req, res) => {
  res.sendFile(__dirname + '/view/Fcompras.html'); 
});

/** /index se encarga de volver al inicio */
rutas.get('/index', (req, res) => {
  res.sendFile(__dirname + '/view/index.html'); 
});


rutas.get('/validar/:url', (req, res) => {
  res.sendFile(__dirname + '/view/validarNuevoUsuario.html'); 
});


rutas.get('/registrar-productos', (req, res) => {
  res.sendFile(__dirname + '/view/registrarProducto.html'); 
});

rutas.get('/cambiar-clave', (req, res) => {
  res.sendFile(__dirname + '/view/cambiarClave.html'); 
});



/** /api/registro se encarga de guardar los nuevos usuarios */
rutas.post('/api/registro', UsuarioControlador.guardarNuevoUsuario);
rutas.post('/api/comprobar-token', UsuarioControlador.comprobarTokenParaValidarlo);
rutas.post('/api/cambiar-clave-loggueado', UsuarioControlador.cambiarClaveLoggueado);

rutas.get('/api/usuario-activo', UsuarioControlador.usuarioActivo);


rutas.post('/api/login', LoginControlador.iniciarSesion);
rutas.get("/api/cerrar-sesion", LoginControlador.cerrarSesion);


rutas.post('/api/registrar-productos', ProductosControlador.guardarProducto);

rutas.put('/api/update-producto/:id', ProductosControlador.actualizarProducto);
rutas.put('/api/delete-producto/:id', ProductosControlador.eliminarProducto);


rutas.get('/api/productos-disponibles', ProductosControlador.productosDisponibles);


rutas.post('/api/realizar-compra', ComprasControlador.realizarCompra)




// /** /validar/:url se encarga de recibir la url para validar el usuario */
// rutas.get('/validar/:url', AdminUsuario.validarUsuarioToken, (req, res) => {  
//   res.sendFile(__dirname + process.env.VALIDAR); 
// });

// /** /claves se encarga de mostrar la vista donde se envia el correo para que te
//   envien el token de cambio de clave */
// rutas.get('/claves', (req, res) => {
//   res.sendFile(__dirname + process.env.CAMBIAR_CLAVE); 
// });

// /** /clavesCambiar/:url se encarga de recibir la url del token para el cambio de
//   clave y muestra para cambiar la clave */
// rutas.get('/clavesCambiar/:url', AdminUsuario.cambioClaveUsuario, (req, res) => {
//   res.sendFile(__dirname + process.env.CLAVE_CAMBIADA); 
// });

// /** /tokenExpiro se encarga de mostrar la vista del token expirado */
// rutas.get('/tokenExpiro', (req, res) => {
//   res.sendFile(__dirname + process.env.TOKEN_EXPIRO); 
// });

// /** /tareas muestra la vista de tareas y tiene un middleware en caso de alquien
//   intente entrar a la vista tareas sin antes haber iniciado sesion */
// rutas.get('/tareas', AdminUsuario.revisarCookie,  (req, res) => {
//   res.sendFile(__dirname + process.env.LISTA_TAREAS)
// });

// /** /tareas/todas/descendentes trae las tareas del usuario loggueado en orden
//   descendente */
// rutas.get('/tareas/todas/descendentes', AdminUsuario.revisarCookie, TareaControlador.mostrarTodasTareasDescendente)

// /** /tareas/todas/descendentes trae las tareas del usuario loggueado en orden
//   ascendente */
// rutas.get('/tareas/todas/ascendentes', TareaControlador.mostrarTodasTareasAscendente)

// /** /usuario_activo muestra el nombre del usuario que se loggueo */
// rutas.get('/usuario_activo', TareaControlador.mostrarUsuarioActivo);


// /** /api/tareas se encarga de guardar las nuevas tareas */
// rutas.post('/api/tareas', TareaControlador.postGuardarTareas);

// /** /api/registro se encarga de guardar los nuevos usuarios */
// rutas.post('/api/registro', AdminUsuario.usuarioRepetido, UsuarioControlador.postGuardarUsuarios);

// /** /api/login se encarga de hacer login */
// rutas.post('/api/login', AdminUsuario.usuarioNoRegistrado, LoginControlador.postLogin);

// /** /api/update-estatus-clase cambia el estatus y clase de las tareas */
// rutas.post('/api/update-estatus-clase', TareaControlador.actualizarTareaEstatusClase);

// /** /api/update-tarea cambia el nombre de una tarea */
// rutas.post('/api/update-tarea', TareaControlador.actualizarTarea);

// /** /api/cambiar-clave cambia la clave si el usuario esta loggueado */
// rutas.post('/api/cambiar-clave', UsuarioControlador.cambiarClaveUsuario);

// /** /api/claveCambiada cambia la clave del usuario mediante un token */
// rutas.post('/api/claveCambiada', UsuarioControlador.cambioClaveUsuario);

// /** /api/cambiar-clave-token se encarga de validar si un usuario existe para enviar
//   el token para el cambio de clave */
// rutas.post('/api/cambiar-clave-token', AdminUsuario.confirmarUsuarioExiste, UsuarioControlador.enviarTokenCambiarClave);


// /** /api/eliminar-individual/id se encarga de eliminar una tarea individual */
// rutas.delete('/api/eliminar-individual/id', TareaControlador.eliminarTareaIndividual);

// /** /api/eliminar-todas se encarga de eliminar todas las tareas */
// rutas.delete('/api/eliminar-todas', TareaControlador.eliminarTareaTodas);

// /** /api/eliminar-marcadas se encarga de eliminar solo las tareas marcadas */
// rutas.delete('/api/eliminar-marcadas', TareaControlador.eliminarTareaMarcadas);