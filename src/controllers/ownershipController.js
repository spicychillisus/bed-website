// SECTION B
// This handles the operations for the ownership of the vehicles
// This shows the which owner ids own which vehicles
// Points earned from Section A can be used here to buy vehicles

// required modules
const model = require('../models/ownershipModel');

// creating ownership record
// this means you own the vehicle and you bought the vehicle
module.exports.createOwnershipRecords = (req, res, next) => {
    // this checks if there are any details that are missing from the insert body and sends out a status code if there are any missing details
    if (req.body.vehicle_id == undefined || req.body.user_id == undefined) {
        res.status(400).send({
            message: "Missing details. Please check again."
        });
    }

    // data needed for the input
    const data = {
        vehicle_id: req.body.vehicle_id,
        user_id: req.body.user_id,
        remainingPoints: res.locals.remainingPoints,
        userpoints: res.locals.userpoints
    };
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error viewing records", error);
            res.status(500).json(error);
        } else {
            let currentPoints = res.locals.remainingPoints; // Deduct points from remainingPoints
            // this is the response that will be sent to the user
            res.status(201).json({
                message: "New record registered!",
                id: results.insertId, // this is the ownership id
                vehicle_id: req.body.vehicle_id,
                user_id: req.body.user_id,
                points_notification: `You now have ${currentPoints} points remaining.` // displays how many points the user has left
            });
            console.log(res.locals.userpoints)
            console.log(currentPoints)
        }
    }
    
    model.createOwnershipRecords(data, callback);
}

// gets the points of the user that wants to add the 
module.exports.getUserPoints = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        res.locals.userpoints = results[0].userpoints;
        if (error) {
            console.error("Error getting points", error)
            res.status(500).json(error)
        } else {
            let userPoints = results[0].userpoints
            // checks if the user has any points to spend
            if (userPoints == undefined || userPoints == null || Number.isInteger(userPoints) == false || userPoints == 0) {
                res.status(403).json({ // 403 Forbidden - cannot proceed as there are no points to spend
                    message: "You do not have any points to spend."
                })
                //console.log(userPoints)
            } else {
                next();
            }
        }
    }
    model.getUserPoints(data, callback);
    
}

// this checks if the user has enough points in the first place
module.exports.checkUserPointsIfEnough = (req, res, next) => {
    const data = {
        vehicle_id: req.body.vehicle_id,    // this data is from the vehicle table
        userpoints: res.locals.userpoints 
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json(error)
        } else {
            let userpoints = res.locals.userpoints
            res.locals.pointsneeded = results[0].pointsneeded;
            // pointsneeded is the price of the vehicle in points
            // userpoints is the amount the user has
            if (results[0].pointsneeded > userpoints) {
                res.status(402).json({ // 402 Payment Required - typically used for online payment, but in this case it means the user just needs to get more points to get the vehicle
                    message: "You currently do not have enough points",
                    points_needed: results[0].pointsneeded,
                    current_user_points: res.locals.userpoints
                })
            } else {
                next(); // proceed to deduct the points
            }
        }
    }
    model.checkUserPointsIfEnough(data, callback)
}

// this deducts a certain amount of points
// formula: total_points - points_needed = remaining points user has
// formula can be found in the README.md
module.exports.deductUserPoints = (req, res, next) => {
    // this data isn't called but it's a reference
    const data = {
        user_id: req.body.user_id,
        vehicle_id: req.body.vehicle_id,
        pointsneeded: res.locals.pointsneeded,
        userpoints: res.locals.userpoints
    }

    // userPoints is the points that the user has
    // requiredPoints is the price of the vehicle in points
    const userPoints = res.locals.userpoints;
    const requiredPoints = res.locals.pointsneeded;
    
    // remainingPoints is the points the user has left
    res.locals.remainingPoints = userPoints - requiredPoints;
    remainingPoints = res.locals.remainingPoints;

    if (remainingPoints >= 0) { // you can't have a negative value for remainder
        next();
    } else {
        res.status(403).json({ // 403 Forbiden - if the result is undefined
            message: "Unable to proceed."
        });
    }

}

// checks if the vehicle exists in the vehicle table
module.exports.checkVehicleExists = (req, res, next) => {
    const data = {
        vehicle_id: req.body.vehicle_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkVehicleExists", error);
            res.status(500).json(error)
        } else {
            // gives out the error message if the vehicle does not exist
            if (results[0].vehicle_id_count == 0) {
                res.status(400).json({
                    message: "The vehicle you are trying to input does not exist"
                })
            } else {
                if (results[0].vehicle_id_count > 0) {
                    next(); // proceed with next middleware
                }
            }
        }
    }
    model.checkVehicleExists(data, callback);
}

// checks if the user exists in the user table
module.exports.checkUserExists = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserExists", error);
            res.status(500).json(error)
        } else {
            // gives out the error message if the vehicle does not exist
            if (results[0].user_id_count == 0) {
                res.status(404).json({
                    message: "The user you are trying to input does not exist"
                    
                })
            } else {
                if (results[0].user_id_count > 0) {
                    next(); // proceed with next middleware
                }
            }
        }
    }
    model.checkUserExists(data, callback);
};

// viewing all the ownership records
module.exports.viewAllOwnershipRecords = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error)
            res.status(500).json(error)
        }
        else res.status(200).json(results);
    }

    model.viewAllOwnershipRecords(callback);
}

// view specific record
// it's the same as /GET
module.exports.viewSpecificOwnershipRecord = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error viewing specific record: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Record not found. Please check your details again."
                });
                console.log(results);
            } else {
                res.status(200).json(results[0]); // this will return your chosen ownership
            }
        }
    }
    model.viewSpecificOwnershipRecord(data, callback);
};

// delete record
// you don't get your points back. this is the same as disowning or scrapping the vehicle.
module.exports.deleteOwnershipRecord = (req, res, next) => {
    // data needed for the model 
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByID:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Ownership record not found"
                });
                
            } else {
                res.status(204).send(); // 204 No Content
            }          
        }
    }
    model.deleteOwnershipRecord(data, callback);
}


