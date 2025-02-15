import express from 'express';
import ProductModel from '../daos/models/product.models.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let rows = parseInt(req.query.rows || 8);
    let result = await ProductModel.paginate({}, { page, limit: rows, lean: true });
    res.render('paginaPrincipal', result);
});

// Obtener todos los productos
router.get('/products', async (req, res) => {
    let page = parseInt(req.query.page);
    let rows = parseInt(req.query.rows || 10);
    let sort = req.query.sort || "desc";

    if (sort !== "asc" && sort !== "desc") {
        sort = "desc";
    }

    if (!page) page = 1;
    if (!page) page = 10;

    let result = await ProductModel.paginate({}, { page, limit: rows, lean: true, sort: { price: sort } });
    result.prevLink = result.hasPrevPage ? `http://localhost:8081/products?page=${result.prevPage}&rows=${rows}&sort=${sort}` : null;
    result.nextLink = result.hasNextPage ? `http://localhost:8081/products?page=${result.nextPage}&rows=${rows}&sort=${sort}` : null;
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.render('products', result);
});


// Obtener un producto por id
router.get('/products/:id', async (req, res) => {
    try {
        let oneProduct = await ProductModel.findById(req.params.id);
        if (!oneProduct) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        oneProduct = oneProduct.toObject();

        res.render('product', { product: oneProduct });
    } catch (error) {
        return res.status(404).render('error', { error: 'Error al buscar un producto' });
    }
});

// Obtener los productos por categoría

router.get('/literaturaClasica', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Literatura Clásica" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/autoayuda', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Autoayuda" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/suspense', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Suspense" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/fantasia', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Fantasía" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/cienciaFiccion', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Ciencia Ficción" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/historia', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Histórica" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});
router.get('/ficcion', async (req, res) => {
    try {
        let products = await ProductModel.find({ category: "Ficción" }).lean();
        res.render('productCategory', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos de Literatura Clásica" });
    }
});

//obtener el estado del render
router.get('/statusQuery', async (req, res) => {

    let page = parseInt(req.query.page);
    let rows = parseInt(req.query.rows || 10);
    let sort = req.query.sort || "desc"
    if (!page) page = 1;
    if (!page) page = 10;
    let result = await ProductModel.paginate({}, { page, limit: rows, lean: true, sort: { price: sort } })
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&rows=${rows}&sort=${sort}` : null;
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&rows=${rows}&sort=${sort}` : null;
    res.json(result)
});

// Eliminación de un producto
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.render('error', { error: 'Producto no encontrado o error al eliminar el producto' });
        }
        res.redirect('/products');
    } catch (error) {
        return res.status(404).render('error', { error: 'Error al eliminar el producto' });
    }
});

export default router;
