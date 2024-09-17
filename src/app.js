import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { engine } from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import { promises as fs } from 'fs';
import viewsRouter from './routes/viewsRoutes.js';

const dataPath = path.join(__dirname, 'src/data/products.json');

// Funciones para manejar productos
async function getProducts() {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data).products;
}

async function saveProducts(products) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf-8');
}

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar el enrutador de vistas
app.use('/', viewsRouter);

// WebSockets
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Emitir productos iniciales
    getProducts().then(products => {
        socket.emit('initialProducts', products);
    });

    // Agregar nuevo producto
    socket.on('newProduct', async (product) => {
        const products = await getProducts();
        products.push(product);
        await saveProducts(products);
        io.emit('updateProducts', product); // Emitir a todos los clientes
    });

    // Eliminar producto
    socket.on('deleteProduct', async (productId) => {
        let products = await getProducts();
        products = products.filter(p => p.id !== productId);
        await saveProducts(products);
        io.emit('removeProduct', productId); // Emitir a todos los clientes
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
