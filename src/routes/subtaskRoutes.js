const express = require('express');
const { createSubtask, getAllUserSubtasks, updateSubtask, deleteSubtask } = require('../controllers/subtaskcontroller');
const { authenticateJWT } = require('../utils/authJobs');
const corsMiddleware = require('../utils/cors'); 

const router = express.Router();

router.use(corsMiddleware);

router.post('/tasks/:taskId/subtasks', authenticateJWT, createSubtask); 

router.get('/subtasks', authenticateJWT, getAllUserSubtasks);

router.put('/subtasks/:subtaskId', authenticateJWT, updateSubtask); 

router.delete('/subtasks/:subtaskId', authenticateJWT, deleteSubtask);

module.exports = router;
