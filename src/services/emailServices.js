import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { templateHtml } from "./template.js";

dotenv.config(); 


export const transporter = createTransport({
    service: "gmail",  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Configuración del correo
export const mailConfig = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Bienvenido/a",
    html: templateHtml,
    attachments: [
        {
            path: `${process.cwd()}/src/services/texto.txt`,
            filename: "resumen-de-cuenta.txt",
        },
    ],
};

// export const mailConfig = {
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subjet: 'bienvenido',
//     text: 'texto del mail'
// }

// const hbsConfig = {
//     viewEngine: {
//         extName: '.handlebars',
//         partialsDir: path.resolve('./src/views'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('./src/views'),
//     extName: '.handlebars',
// };




// transporter.use('compile', hbs(hbsConfig));

// export const mailConfigHbs = {
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subject: 'Usando Handlebars',  // Corregido "subjet" a "subject"
//     template: 'email',  // Este debe ser el nombre del archivo sin la extensión
//     context: {
//         name: 'Juan',
//         text: 'Gracias por ingresar a nuestra web'
//     }
// };
