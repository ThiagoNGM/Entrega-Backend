import { createHash, isValidPassword } from "../utils.js";
import Services from "./servicesManager.js";
import { userDao } from "../daos/mongodb/userDao.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { cartService } from "./cartServices.js";

class UserService extends Services {
    constructor() {
        super(userDao);
    }

    generateToken = (user) => {
        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        };

        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
    };

    getUserByEmail = async (email) => {
        try {
            const user = await this.dao.getByEmail(email);  // Verifica si el 'dao' está retornando el usuario correctamente
            console.log("User found:", user);  // Agrega este log para ver qué devuelve la base de datos
            return user;
        } catch (error) {
            throw new Error(error);
        }
    };



    register = async (user) => {
        try {
            const { email, password } = user;

            // Validamos que el password esté presente
            if (!password || typeof password !== 'string') {
                throw new Error('la contraseña debe ser una cadena');
            }

            const existUser = await this.getUserByEmail(email);
            if (existUser) throw new Error("usuario ya existente");

            const cartUser = await cartService.createCart();

            // Creamos el nuevo usuario con el password encriptado
            const newUser = await this.dao.register({
                ...user,
                password: createHash(password),
                cart: cartUser._id
            });
            return newUser;
        } catch (error) {
            throw error;
        }
    };

    login = async (user) => {
        try {
            const { email, password } = user;
            const userExist = await this.getUserByEmail(email);

            if (!userExist) throw new Error("User not found");

            const passValid = isValidPassword(password, userExist);
            if (!passValid) throw new Error("incorrect credentials");

            return this.generateToken(userExist);
        } catch (error) {
            throw error;
        }
    };
}

export const userService = new UserService();
