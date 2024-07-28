// This handles all message routes that are important
const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.post("/", controller.insertNewMessage);
router.get("/", controller.seeAllMessages);
router.get("/:message_id", controller.viewMessage);
router.put("/:message_id", controller.editMessage);
router.delete("/:message_id", controller.deleteMessageWithID);

module.exports = router;

