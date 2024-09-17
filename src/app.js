import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { engine } from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import { promises as fs } from 'fs';
import viewsRouter from './routes/viewsRoutes.js';

const dataPath = path.join(__dirname, 'src/data/products.json');


async function getProducts() {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data).products;
}

async function saveProducts(products) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf-8');
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Mostrar los productos iniciales
    getProducts().then(products => {
        socket.emit('initialProducts', products);
    });

    // Agregar un nuevo producto
    socket.on('newProduct', async (product) => {
        const products = await getProducts();
        products.push(product);
        await saveProducts(products);
        io.emit('updateProducts', product);
    });

    // Eliminar un solo producto
    socket.on('deleteProduct', async (productId) => {
        let products = await getProducts();
        products = products.filter(p => p.id !== productId);
        await saveProducts(products);
        io.emit('removeProduct', productId);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
