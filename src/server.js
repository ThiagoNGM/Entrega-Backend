import express from "express";
import session from "express-session";
import cookieParser from 'cookie-parser';

import loginRouter from './routes/loginRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import productsRouter from './routes/productsRoutes.js';
import usersRouter from './routes/usersRouter.js';

import { initMongoDB } from "./db/dbConfig.js";
import { errorHandler } from './middlewares/errorHandler.js';
import passport from "passport";
import MongoStore from "connect-mongo";

import dotenv from "dotenv";
import './passport/jwt.js';

import methodOverride from "method-override";
import http from 'http';
import { engine } from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';

const app = express();

dotenv.config();

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.URI_MONGO,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', productsRouter);
app.use('/views', loginRouter);
app.use('/users', usersRouter);
app.use('/login', viewsRouter);

app.use(errorHandler);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const server = http.createServer(app);

initMongoDB()
    .then(() => console.log('conectado a mongoDB'))
    .catch((error) => console.log(error));

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
