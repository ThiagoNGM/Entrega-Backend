import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('login')
});

router.get('*', (req, res) => {
    res.send('Ruta inexistente')
});

export default router
