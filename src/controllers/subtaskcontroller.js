const Subtask = require('../models/subtaskmodel');
const User = require('../models/usermodel');
const Task = require('../models/taskmodel');

const createSubtask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const subtask = new Subtask({
            task_id: taskId,
        });

        await subtask.save();
        const user = await User.findById(task.user);
        if (user) {
            user.priority += 1;
            await user.save();
        }

        res.status(201).json(subtask);
        console.log('Task ID:', taskId);
        console.log('Found Task:', task);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllUserSubtasks = async (req, res) => {
    try {
        const taskId = req.query.taskId; 
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const subtasks = await Subtask.find({ task_id: taskId });

        res.status(200).json(subtasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSubtask = async (req, res) => {
    try {
        const subtaskId = req.params.subtaskId;
        const { status } = req.body;

        const subtask = await Subtask.findById(subtaskId);

        if (!subtask) {
            return res.status(404).json({ error: 'Subtask not found' });
        }
        if (status !== undefined) {
            subtask.status = status;
        }

        await subtask.save();

        res.status(200).json(subtask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSubtask = async (req, res) => {
    try {
        const subtaskId = req.params.subtaskId;

        const subtask = await Subtask.findById(subtaskId);

        if (!subtask) {
            return res.status(404).json({ error: 'Subtask not found' });
        }

        subtask.deleted_at = new Date();
        await subtask.save();

        res.status(200).json({ message: 'Subtask deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSubtask,
    getAllUserSubtasks,
    updateSubtask,
    deleteSubtask,
};
