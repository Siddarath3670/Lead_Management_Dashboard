import { Router } from 'express';
import leadController from '../controllers/leadController.js';
import protect from '../middleware/authMiddleware.js';

const { getLeads, getLeadById, getDashboardStats } = leadController;

const router = Router();

// Routes
router.get('/', protect, getLeads);
router.get('/dashboard', protect, getDashboardStats); // keep before /:id
router.get('/:id', protect, getLeadById);

export default router;
