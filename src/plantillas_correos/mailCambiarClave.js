import dotenv from 'dotenv';

dotenv.config();


export const htmlEmailCambiarClave = (validarEmpleado) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
                  <section>
                      <h1>Bienvenido: </h1>
                      <div>
                          <p>Bienvenido a su aplicacion Sion-Nodejs, aqui puede guadar sus tareas diarias</p>
                      </div>
                      <div>
                          <p>Haz click en el siguiente enlace para su cambio de clave</p>
                          <a href="${process.env.DIRECCION_LOCAL}/cambiar-clave-token/${validarEmpleado}">Click aqui GoriShop cambiar clave: ${validarEmpleado}</a>
                      </div>
                  </section>    
              </body>
              </html>
              `;
  return html;
};
