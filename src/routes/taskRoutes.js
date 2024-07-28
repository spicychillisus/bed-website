// This handles all endpoint data for task


const express = require('express');
const router = express.Router();

const controller = require("../controllers/taskController");

router.get('/', controller.readAllTask); // reads all the task available in the database
router.post('/', controller.createTask); // creates task

router.get('/:task_id', controller.readTaskByID); // reads task by providing id
router.put('/:task_id', controller.updateTaskByID); // updates task by providing id
router.delete('/:task_id', controller.deleteTaskByID); // deletes task by providing id

module.exports = router;