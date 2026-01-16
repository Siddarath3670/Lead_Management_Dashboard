import { Router } from 'express';
import authController from '../controllers/authController.js';

const { authUser, registerUser } = authController;

const router = Router();

router.post('/login', authUser);
router.post('/register', registerUser);

export default router;
