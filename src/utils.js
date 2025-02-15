import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from 'bcrypt';

export const createHash = (password) => {
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }
    const salt = bcrypt.genSaltSync(10); // Generamos el salt
    return bcrypt.hashSync(password, salt); // Usamos el salt generado
};

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);