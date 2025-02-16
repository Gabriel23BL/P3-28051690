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




