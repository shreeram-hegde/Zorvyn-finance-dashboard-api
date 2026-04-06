const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');


router.get('/summary', verifyToken, authorizeRoles('Viewer', 'Analyst', 'Admin'), dashboardController.getDashboardSummary);

module.exports = router;