import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cartModel from '../models/cart.models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();


router.get('/', async (req, res) => {
    let result = await cartModel.paginate({}, { lean: true });
    res.render('carrito', result);
});

// router.post('/:id', async (req, res) => {
//     // 1 ver si el producto ya se encuentra en el carrito, si es el caso, sumar el producto y devolver el carrito actualizado
//     // 2 ir al modelo ed productos y traer los datos de ese producto
//     // 3 guardar este producto en la carpeta carts
//     try {
//         let oneProduct = await ProductModel.findById(req.params.id);
//         await cartModel.create(oneProduct);

//         res.render('products')

//         res.status(200);
//     } catch (error) {
//         return res.status(404).render('error', { error: 'Error al guardar un producto' });
//     }
// })

router.get('/json', async (req, res) => {


    let result = await cartModel.paginate({});
    res.json(result);
});

router.post('/')


export default router;




