import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { rutas } from "./src/router/router.js";
//import { conectar } from "./src/db/database.js";
import { conectar } from "./src/db/databaseSqlite.js";

dotenv.config();

export const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, '/public')));
app.use(express.json());

// Rutas
app.use(rutas);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

conectar();
// Corriendo el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutando en el puerto ${PORT}`);
});
