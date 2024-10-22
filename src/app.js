import express from "express";
import methodOverride from "method-override";
import { Server } from 'socket.io';
import http from 'http';
import { engine } from 'express-handlebars';
import path from 'path';
import mongoose from "mongoose";
import __dirname from './utils.js';
import dotenv from "dotenv";
import productsRouter from './routes/productsRoutes.js';
import cartsRouter from './routes/cartRoutes.js';

dotenv.config();
const URIConexion = process.env.URI_MONGO;

mongoose.connect(URIConexion)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((error) => console.error('Error en la conexión', error));

const app = express();
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);

app.use('/', productsRouter);
app.use('/carts', cartsRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
