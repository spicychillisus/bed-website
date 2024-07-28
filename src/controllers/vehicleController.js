// SECTION B (CA1)
// this controller is in charge of handling the operations for the certain vehicles that can be purchased with the points
// the user has accumulated in section A. 
// the vehicle table is a universal vehicle table, meaning that users can only own vehicles from this table
// -------------------------------------------
// required module
const model = require('../models/vehicleModel');

// checks if the user inputs a category that is listed or not listed
module.exports.categoryCheck = (req, res, next) => {
    // data handling
    const data = {
        category: req.body.category
    }

    let allowedCategories = ['CAR', 'BUS', 'MOTOR', 'PLANE', 'OTHERS']; // categories of vehicle valid for input
    let inputCategory = req.body.category
    let capital = inputCategory.toUpperCase();
    // to check if category is allowed
    if (allowedCategories.includes(capital) == false) {
        res.status(422).json({ // 422 Unprocessable Content - value input is not valid  
            message: "The category you inputted is not valid",
            allowed_categories: "CAR, BUS, MOTOR, PLANE, OTHERS",
        })
    } else {
        next(); // continues with the input
    }
};

// checks if the user inputs a numerical value
module.exports.pointsCheck = (req, res, next) => {
    const data = {
        points_needed: req.body.points_needed
    }

    let requiredPoints = req.body.points_needed;
    // check if the points user will input is a positive integer (it can't be negative)
    if (requiredPoints < 0) {
        res.status(400).json({
            message: "Your points must be a positive integer"
        })
    } else {
        if (Number.isInteger(requiredPoints) == false) {
            res.status(400).json({
                message: "Error: points should be an integer more than 0."
            })
        } else {
            if (requiredPoints == 0) {
                res.status(400).json({
                    message: "Please enter a value that is equal to or more than 1."
                })
            } else {
                next(); // proceeds with the input
            }
        }
    }
}

//POST /vehicles
module.exports.createNewVehicle = (req, res, next) => {

    const data = {
        vehicle_name: req.body.vehicle_name,
        category: req.body.category,
        vehicle_description: req.body.vehicle_description,
        points_needed: req.body.points_needed,
        added_by_user_id: req.body.added_by_user_id
    };

    if (req.body.vehicle_name == undefined || req.body.category == undefined || req.body.vehicle_description == undefined || req.body.points_needed == undefined || req.body.added_by_user_id == undefined) {
        res.status(400).send("Error inserting new vehicle. Please check your details");
    } 

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error inserting new vehicle", error)
            res.status(500).json(error);
        } else {
            const category = req.body.category;
            const capitalised = category.toUpperCase();
            const response = {
                    message: "New vehicle inserted!",
                    id: results.insertId,
                    vehicle_name: req.body.vehicle_name,
                    vehicle_description: req.body.vehicle_description,
                    category: capitalised,
                    points: req.body.points_needed,
                    added_by: req.body.added_by_user_id
                }
            res.status(201).json(response);
        }
    }
    model.createNewVehicle(data, callback);
};

// retrieves all the vehicles that are in the table
module.exports.getAllVehicle = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllVehicle:", error)
            res.status(500).json(error)
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
};

// reads vehicle bya certain id
module.exports.readVehicleID = (req, res, next) => {
    
    const data = {
        vehicle_id: req.params.vehicle_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readVehicleID: ", error)
            res.status(500).json(error)
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Vehicle not found"
                })
            } else {
                res.status(200).json(results[0])
            }
        }
    }

    model.selectVehicleById(data, callback)
};

// updates the vehicle details
module.exports.updateVehicleDetails = (req, res, next) => {
    if (req.params.vehicle_id == undefined || req.body.vehicle_name == undefined || req.body.category == undefined || req.body.vehicle_description == undefined || req.body.points_needed == undefined) {
        res.status(404).send("Error updating details. Please check again.");
    } 

    const data = {
        vehicle_id: req.params.vehicle_id,
        vehicle_name: req.body.vehicle_name,
        category: req.body.category,
        vehicle_description: req.body.vehicle_description,
        points_needed: req.body.points_needed
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error inserting new vehicle", error)
            res.status(500).send(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(200).send({
                    message: "Vehicle updated!",
                    updated_id: parseInt(req.params.vehicle_id),
                    vehicle_name: req.body.vehicle_name,
                    category: req.body.category,
                    description: req.body.vehicle_description,
                    points: req.body.points_needed
                });
            }
            
        }
    };

    model.updateVehicleDetails(data, callback);
    
}

// deletes the vehicle entry
// points can be duplicated
module.exports.deleteVehicleByID = (req, res, next) =>
{
    const data = {
        vehicle_id: req.params.vehicle_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByID:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Vehicle not found"
                });
                
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteVehicleById(data, callback);
}


