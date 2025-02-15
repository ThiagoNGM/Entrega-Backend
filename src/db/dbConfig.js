import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URIConexion = process.env.URI_MONGO;

export const initMongoDB = async () => {
    try {
        await connect(URIConexion);
    } catch (error) {
        throw new Error(error);
    }
};