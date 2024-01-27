// taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    due_date: Date,
    priority: Number,
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    deleted_at: Date,
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
