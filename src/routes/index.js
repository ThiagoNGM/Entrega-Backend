import Router from 'express';

import loginRouter from './loginRouter.js';
import viewsRouter from './viewsRouter.js';
import productRouter from './productRouter.js';
import usersRouter from './usersRouter.js';
import emailRouter from './emailRouter.js'

const router = Router();

router.use('/', productRouter);
router.use('/views', loginRouter);
router.use('/users', usersRouter);
router.use('/login', viewsRouter);
router.use('/api', emailRouter)

export default router;