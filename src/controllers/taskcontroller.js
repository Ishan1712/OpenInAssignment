// taskController.js
const Task = require("../models/taskmodel");
const Subtask = require("../models/subtaskmodel");
const User = require("../models/usermodel");


const createTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        const userId = req.user.id;

        if (!title || !description || !due_date) {
            throw new Error('Incomplete task details');
        }

        const task = new Task({
            title,
            description,
            due_date,
            user: userId,
        });

        await task.save();

        const user = await User.findById(userId);
        if (user) {
            user.priority += 1;
            await user.save();
        }

        const successMessage = 'Task added successfully';
        console.log(successMessage, task); 
        res.status(201).json({ message: successMessage, task });
    } catch (error) {
        console.error('Error creating task:', error); 
        res.status(400).json({ error: error.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { due_date, status } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (due_date) {
            task.due_date = due_date;
        }

        if (status) {
            task.status = status;
        }

        await task.save();

        const user = await User.findById(task.user);
        if (user) {
            user.priority += 1;
            await user.save();
        }

        const successMessage = 'Task updated successfully';
        console.log(successMessage, task); 
        res.status(200).json({ message: successMessage, task });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const getAllUserTasks = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { priority, due_date, page, limit } = req.query;

//         const filter = { user: userId };
//         if (priority) {
//             filter.priority = priority;
//         }
//         if (due_date) {
//             filter.due_date = due_date;
//         }

//         const options = {
//             page: parseInt(page, 10) || 1,
//             limit: parseInt(limit, 10) || 10,
//         };

//         const tasks = await Task.paginate(filter, options);

//         const successMessage = 'Fetched tasks successfully';
//         console.log(successMessage, tasks);
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error('Error getting tasks:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const getAllUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ user: userId });

        const successMessage = 'Fetched tasks successfully';
        console.log(successMessage, tasks); // Log success
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error); // Log error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.deleted_at = new Date();
        await task.save();

        const successMessage = 'Task deleted successfully';
        console.log(successMessage); 
        res.status(200).json({ message: successMessage });
    } catch (error) {
        console.error('Error deleting task:', error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createTask,
    getAllUserTasks,
    updateTask,
    deleteTask,
};
