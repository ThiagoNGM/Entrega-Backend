import { Router } from "express";
// import ProductManager from '../manager/productManager.js';
import { prodController } from "../controllers/productControllers.js";
import { checkAdmin } from '../middlewares/checkAdmin.js';

const router = Router();
// const ProductManager = new ProductManager();

router.route('/')
    .get(prodController.getAll)
    .post(checkAdmin, prodController.create)

router.route('/:id')
    .get(prodController.getById)
    .put(checkAdmin, prodController.update)
    .delete(checkAdmin, prodController.delete);

export default router;
