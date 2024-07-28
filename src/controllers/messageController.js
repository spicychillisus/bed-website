const model = require('../models/messageModel');

// adding a new message
module.exports.insertNewMessage = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        message: req.body.message
    }

    if (req.body.message == undefined || req.body.message == "") {
        res.status(400).send({
            message: "Message cannot be empty"
        });
        return;

    } else {
        if (req.body.user_id == undefined) {
            res.status(400).send({
                message: "User ID undefined"
            });
            return;

        }
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("error creating message: ", error)
            res.status(500).json({
                message: "Error creating message"
            });
        } else {
            res.status(201).json({
                message: "Message created successfully"
            });
        
        }
    }
    model.insertNewMessage(data, callback);
}

// middleware to see all messages
module.exports.seeAllMessages = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("error viewing all messages: ", error)
            res.status(500).json({
                message: "Error viewing all messages"
            });
        } else {
            res.status(200).json(results);
        }
    }
    model.seeAllMessages(callback);
}

// to view a specific message
module.exports.viewMessage = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("error viewing message: ", error)
            res.status(500).json({
                message: "Error viewing message"
            });
        } else {
            if(results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.viewMessage(data, callback);
}

// edit message
module.exports.editMessage = (req, res, next) => {
    const data = {
        message_id: req.body.message_id,
        message: req.body.message
    }

    if (req.body.message == undefined || req.body.message == "") {
        res.status(400).send({
            message: "Message cannot be empty"
        });
        return;

    } else {
        if (req.body.message_id == undefined) {
            res.status(400).send({
                message: "Message ID undefined"
            });
            return;

        }
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("error editing message: ", error)
            res.status(500).json({
                message: "Error editing message"
            });
        } else {
            if(results.affectedRows == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            } else {
                res.status(200).json({
                    message: "Message edited successfully"
                });
            }
        }
    }
    model.editMessage(data, callback);
}

// unlike whatsapp, this will delete the message and you will not see the deleted message
module.exports.deleteMessageWithID = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("error deleting message: ", error)
            res.status(500).json({
                message: "Error deleting message"
            });
        } else {
            if(results.affectedRows == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            } else {
                res.status(209).json({
                    message: "Message deleted successfully"
                });
            }
        }
    }
    model.deleteMessageWithID(data, callback);
}