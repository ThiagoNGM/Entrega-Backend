import { transporter, mailConfig } from "../services/emailServices.js"
import { templateHtml } from "../services/template.js";
import dotenv from "dotenv";


dotenv.config(); // Asegura que las variables de entorno estén cargadas


export const sendGmail = async (req, res) => {
    try {
        const response = await transporter.sendMail(mailConfig);
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
}


// export const sendMailEthereal = async (resq, res) => {
//     try {
//         const response = await transporter.sendMail(mailConfig);
//         res.json(response)
//     } catch (error) {
//         res.send(error.message);
//     }
// }

// export const sendMailHbsEthereal = async (resq, res) => {
//     try {
//         const response = await transporter.sendMail(mailConfigHbs);
//         res.json(response)
//     } catch (error) {
//         res.send(error.message);
//     }
// }