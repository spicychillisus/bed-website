// Section A
// This part handles the task functions

// required module
const model = require('../models/taskModel');

// reads all task (GET /tasks)
// test passed
module.exports.readAllTask = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error)
            res.status(500).json(error)
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// creates task
// test passed
module.exports.createTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).send("Error creating task. Please check your details.")
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createTask", error) 
            res.status(500).json(error)
        } else {
            const response = {
                task_id: results.insertId,
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            };
            res.status(201).json(response)
        }
    }

    model.insertTask(data, callback)
}

// GET /tasks/{task_id}
module.exports.readTaskByID = (req,res,next) => {

    const data = {
        task_id: req.params.task_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByID: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            } else {
                res.status(200).json(results[0]); // this will return your chosen user_id
            }
        }
    }

    model.selectByID(data, callback);
}



// update task by a certain id
module.exports.updateTaskByID = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Error: title is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    // error detected
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskByID", error) 
            res.status(500).json(error)
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "task not found"
                })
                console.log(req)
            } else {
                res.status(200).json({
                    task_id: parseInt(req.params.task_id),
                    title: req.body.title,
                    description: req.body.description,
                    points: req.body.points
                })
                console.log(results)
            }
        }
    }

    model.updateByID(data, callback)
};

module.exports.deleteTaskByID = (req, res, next) => {
    const data = { 
        task_id: req.params.task_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskByID: ", error)
            res.status(500).json(error)
        } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "Task cannot be found"
                })
            }
            else res.status(204).send()
        }
    }

    model.deleteByID(data, callback)
}