// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { authenticateJWT } = require('../utils/authJobs');


router.post('/users', authenticateJWT, userController.createUser);
router.get('/users', authenticateJWT, userController.getAllUsers);

module.exports = router;
