const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    selected_student_id: {
        type: String,
        required: true,
    },
    login_teacher_id: {
        type: String,
        required: true,
    },
    task_status: {
        type: String,
        required: true,
    },
    column: {
        type: String,
        required: true,
    },
    task_assigned_date_and_time: {
        type: String,
        required: true,
    },
});

const TasksModal = mongoose.model('tasks', TasksSchema);
module.exports = TasksModal;
