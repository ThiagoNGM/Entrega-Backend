import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

let productsFilePath = path.join(__dirname, 'data', 'products.json');

function generarId(longitud = 8) {
    const caracteres = '0123456789abcdef';
    let id = '';
    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        id += caracteres[randomIndex];
    }
    return id;
}


let readProducts = () => {
    let data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data).products;
}

let writeProducts = (products) => {
    let jsonData = JSON.stringify({ products }, null, 2);
    fs.writeFileSync(productsFilePath, jsonData, 'utf8');
}

router.get('/products', (req, res) => {
    let products = readProducts();
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    let products = readProducts();
    const productIdBuscado = req.params.id;
    const product = products.find(product => product.id === productIdBuscado);
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

router.post('/products', (req, res) => {
    let products = readProducts();
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const newProduct = {
        id: generarId(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

router.put('/products/:id', (req, res) => {
    let products = readProducts();
    let productId = req.params.id;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    let updatedProduct = {
        id: productId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };
    let productIndex = products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    products[productIndex] = updatedProduct;
    writeProducts(products);
    res.status(204).json(updatedProduct)
});


router.delete('/products/:id', (req, res) => {
    let products = readProducts();
    const productAEliminar = req.params.id;
    const productIndex = products.findIndex(producto => producto.id === productAEliminar)

    if (productIndex === -1) {
        return res.status(404).json({ error: 'produto no encontrado' })
    }

    const deletedProduct = products.splice(productIndex, 1);
    writeProducts(products);
    res.status(204).json({ mensaje: 'Tarea eliminada', deletedProduct })
});

export default router;
