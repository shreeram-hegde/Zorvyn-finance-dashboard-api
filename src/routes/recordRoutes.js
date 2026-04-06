const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/rbac.middleware');

router.use(verifyToken); 


router.get('/', authorizeRoles('Analyst', 'Admin'), recordController.getAllRecords);


router.post('/', authorizeRoles('Admin'), recordController.createRecord);
router.delete('/:id', authorizeRoles('Admin'), recordController.deleteRecord);
router.put('/:id', authorizeRoles('Admin'), recordController.updateRecord);

module.exports = router;