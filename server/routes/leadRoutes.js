const express = require('express');
const { getLeads, getLeadById, getDashboardStats } = require('../controllers/leadController').default;
const { protect } = require('../middleware/authMiddleware').default; // Need to create middleware
const router = express.Router();

// Public for now effectively, or we add protect middleware.
// Requirements say "Login screen (basic auth is fine)". 
// I should add a simple protection middleware.

router.get('/', getLeads);
router.get('/dashboard', getDashboardStats); // Should be before /:id to avoid conflict
router.get('/:id', getLeadById);

module.exports = router;
