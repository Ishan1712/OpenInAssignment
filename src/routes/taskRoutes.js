// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');
const subtaskController = require('../controllers/subtaskcontroller');
const { authenticateJWT } = require('../utils/authJobs');


router.post('/tasks', authenticateJWT, taskController.createTask);


router.get('/tasks', authenticateJWT, taskController.getAllUserTasks);


router.put('/tasks/:id', authenticateJWT, taskController.updateTask);


router.delete('/tasks/:id', authenticateJWT, taskController.deleteTask);


router.post('/tasks/:taskId/subtasks', authenticateJWT, subtaskController.createSubtask);


router.get('/tasks/:taskId/subtasks', authenticateJWT, subtaskController.getAllUserSubtasks);

router.put('/subtasks/:subtaskId', authenticateJWT, subtaskController.updateSubtask);

router.delete('/subtasks/:subtaskId', authenticateJWT, subtaskController.deleteSubtask);

module.exports = router;
