// Section A
// This part handles the taskProgress functions
// required model
const model  = require('../models/taskProgressModel');

// gets all task progress data that is stored in the database
module.exports.readAllTaskProgress = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTaskProgress: ", error);
            res.status(500).json(error)
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

// need to check for errors
// fixing the error in the routes fixed the error (21/12)
module.exports.readTaskProgressID = (req, res, next) => {

    const data = {
        progress_id: req.params.progress_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByID: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "progress_id not found"
                });
            } else {
                res.status(200).json(results[0]); // this will return your chosen id
                console.log(results);
            }
        }
    }

    model.selectByProgressID(data, callback)
}

// checks if the userID in the request body exists
module.exports.checkUserID = (req, res, next) => {
    // this takes data from the user table
    const data = {
        user_id: req.body.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error)
            console.log(results);
        } else {
            if (results[0].user_count == 0) {
                // this message will appear if the user does not exist
                res.status(404).json({
                    message: "UserID not found."
                })
            } else {
                next(); // proceed with next check
            }
        }
    }
    model.checkUserID(data, callback);

}

// checks if the taskID in the user body exists
module.exports.checkTaskID = (req, res, next) => {
    // takes data from the task table
    const data = {
        task_id: req.body.task_id
    };

    const callback = (error, results, fields) => {
        if(error) {
            res.status(500).json(error)
        } else {
            // checks if the task exists by counting how many of the needed task_id (it should only be 1)
            // if count = 0, it means the task does not exist.
            if (results[0].task_count == 0) {
                res.status(404).json({
                    message: "TaskID not found."
                })
            } else {
                next(); // proceed to input the task progress
            }
        }
    }
    model.checkTaskID(data, callback);
}

module.exports.createTaskProgress = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).send("error blyad")
        return;
    }

    // retrieves the data
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("error", error)
            res.status(500).json(error)
        } else {
            res.status(201).json({
                progress_id: results.insertId,
                user_id: req.body.user_id,
                task_id: req.body.task_id,
                completion_date: req.body.completion_date,
                notes: req.body.notes
            })
        }
    }
    model.insertTaskProgress(data, callback)
}

module.exports.updateTaskProgress = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).json({
            message: "Notes are missing. Please check again."
        })
    }
    // this is the only data that needs to be updated
    const data = {
        notes: req.body.notes,
        progress_id: req.params.progress_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskProgress: ", error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Unable to update progress"
                })
            }
            else res.status(200).send();
        }
    }

    model.updateTaskProgress(data, callback)
}

module.exports.deleteTaskProgress = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskProgress: ", error);
            res.status(500).json(error)
        } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "Progress cannot be found"
                })
            }
            else res.status(204).send();
        }
    }

    model.deleteByID(data, callback);
}