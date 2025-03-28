import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('❌ Faltan datos en la petición');
    }

    res.cookie("userEmail", email, { maxAge: 15000, httpOnly: true })
        .cookie("userPassword", password, { maxAge: 16000, httpOnly: true })
        .send('✅ Cookies agregadas correctamente');
});

router.get('*', (req, res) => {
    res.send('Ruta inexistente')
});

export default router;
