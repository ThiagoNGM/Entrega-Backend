import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { passportCall } from "../passport/passportCall.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/current", [passportCall('current')], userController.privateData);

router.get('*', (req, res) => {
    res.send('Ruta inexistente')
});

export default router;