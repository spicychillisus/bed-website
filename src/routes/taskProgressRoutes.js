// This handles all endpoint data for task progress

const express = require('express');
const router = express.Router();

const controller = require("../controllers/taskProgressController");

router.get('/', controller.readAllTaskProgress);
router.post('/', controller.checkUserID, controller.checkTaskID, controller.createTaskProgress); // it checks if the userid exists first, followed by the taskid

router.get('/:progress_id', controller.readTaskProgressID);
router.put('/:progress_id', controller.updateTaskProgress);
router.delete('/:progress_id', controller.deleteTaskProgress);

module.exports = router;