import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

let cartsFilePath = path.join(__dirname, 'data', 'carts.json');

let readCarts = () => {
    let data = fs.readFileSync(cartsFilePath, 'utf8');
    return JSON.parse(data).carts;
}

let writeCarts = (carts) => {
    let jsonData = JSON.stringify({ carts }, null, 2);
    fs.writeFileSync(cartsFilePath, jsonData, 'utf8');
}

router.get('/carts', (req, res) => {
    let carts = readCarts();
    res.json(carts);
});

router.get('/carts/:id', (req, res) => {
    let carts = readCarts();
    const cartIdBuscado = parseInt(req.params.id);
    const cart = carts.find(cart => cart.id === cartIdBuscado);
    if (!cart) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(cart);
});

router.post('/carts', (req, res) => {
    let carts = readCarts();
    let newCart = {
        id: Date.now(),
        products: req.body.items || []
    };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

router.put('/carts/:cid', (req, res) => {
    let carts = readCarts();
    let cartId = parseInt(req.params.cid);
    let updatedCart = {
        id: cartId,
        items: req.body.items || []
    };

    let cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex === -1) {
        return res.status(404).json({ error: "No existe el carrito" });
    }
    carts[cartIndex] = updatedCart;
    writeCarts(carts);
    res.status(204).json(updatedCart)
});

export default router;




