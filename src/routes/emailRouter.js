import { Router } from 'express';
import { sendGmail } from '../controllers/emailController.js';
const router = Router();

router.post('/gmail', sendGmail)
// router.post('/sendHbs', sendMailHbsEthereal)

export default router;