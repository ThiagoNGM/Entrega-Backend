import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import __dirname from '../utils.js';
import { promises as fs } from 'fs'; // Importa el módulo fs

const router = express.Router();

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
    const dataPath = path.join(__dirname, 'data/products.json');

    // Función para obtener productos
    async function getProducts() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            return JSON.parse(data).products;
        } catch (error) {
            console.error('Error al leer los productos:', error);
            return [];
        }
    }

    const products = await getProducts();
    res.render('realTimeProducts', { products }); // Renderiza la vista realTimeProducts.handlebars
});

export default router;
