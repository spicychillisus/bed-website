// Section A
// This part handles the user handling functions

// required module
const model = require('../models/userModel');
const db = require('../services/db');

// a middleware is created to check for any duplicate email entries
// if count > 0, throw error message or else write to database
// test passed
module.exports.duplicateEmailCheck = (req, res, next) => {

    // this handles the data
    const data = {
        email: req.body.email
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking email:", error);
            res.status(500).json(error);
        } else {
            if (results[0].count > 0) {
                res.status(409).json({
                    // this error message pops up if a user is already using that email
                    message: "Email already exists. Please use a different email."
                })
            } else next(); // will continue with the input if email does not exist
        }
    }

    model.checkForDuplicateEmail(data, callback);
}

// middleware to check if username exists (this is for updating, or is it)
// it looks the same as the middlware to check for duplicate email (it porbably is) as it uses the same logic
// this middleware is used for update user
module.exports.dupUsernameCheck = (req, res, next) => {
    const data = {
        username: req.body.username
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking email:", error);
            res.status(500).json(error);
        } else {
            // this checks if the database detects if there is more than 1 of a certain data in a column
            if (results[0].count > 0) {
                res.status(409).json({
                    // this error message pops up if a user is already using that email
                    message: "Username already exists. Please use a different username."
                })
            } else next(); // will continue with the input if email does not exist
        }
    }

    model.checkForDuplicateUsername(data, callback);
}

// method: /POST new user
// creates a new user 
// the same as register (CA2)
module.exports.createNewUser = (req, res, next) => {
    // if no username or email is inputted, it returns status 400 and an error message.
    if (req.body.username === undefined || req.body.email === undefined || req.body.password == undefined) {
        res.status(400).send("ERROR: USERNAME OR EMAIL IS MISSING");
        return;
    }

    // this handles the data
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    };

    

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error creating new user:", error);
            res.status(500).json(error);
        } else {
            // this response variable is the message that will appear in the request body
            const response = {
                message: "User created successfully.",
                username: req.body.username,
                email: req.body.email
            };
           /*  res.locals.hash = req.body.password; */
            //console.log(res.locals.hash)
            res.status(201).json(response);
        }
    };

    model.insertSingle(data, callback);

};

// added for CA2
// this is for login purposes
// thanks clarence !!! (not my class clarence)
module.exports.login = (req, res, next) =>
{

    if(req.body.username == undefined || req.body.password == undefined)
    {
        res.status(400).send("Username or password not inputted.");
        return;
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addUser:", error);
            res.status(500).json(error);
        } 
        else {
            db.query(`SELECT password FROM user WHERE username = ?;`, [data.username], (err, result) => {
                if (err) {
                    console.error('Error finding password of user.');
                    res.status(500).json(error);
                    return;
                }
                else {
                    res.locals.message = "We're now redirecting you. Please be patient...";
                    res.locals.hash = result[0].password;
                    db.query(`SELECT user_id FROM user WHERE username = ?;`, [data.username], (err, results) => {
                        if (err) {
                            console.error('Error finding user ID of user.');
                            res.status(500).json(error);
                            return;
                        }
                        else {
                            res.locals.userId = results[0].user_id
                            next();
                        }
                    });
                }
            });
        }
    }

    model.login(data, callback);
}



// reads a specific user by a specific user id
// this data will be used to display the user's profile in the front end
module.exports.readUserByID = (req,res,next) => {
    // reads the user_id data so it knows which user data to show
    const data = {
        user_id: req.params.user_id
    };

    // modifying this to give the points as well
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByID: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found" // this message will appear if the user cannot be found.
                });
            } else {
                res.status(200).json([{
                    user_id: results[0].user_id,
                    username: results[0].username,
                    email: results[0].email,
                    total_points: parseInt(results[0].userpoints)
                    /* results: {user_id: results[0].user_id} */
                }]); // this will return your chosen user_id
            }
        }
    }

    model.selectByID(data, callback);
}

// gets all users 
// test passed
module.exports.readAllUsers = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error)
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

// /PUT
// updates the user information
// this one got error also so i need to fix (16/12)
// error fixed in userModel.js (18/12)
// error detected for duplicate email and username
module.exports.updateUserByID = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(404).json({
            message: "Error: username or email is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserByID", error);
            res.status(500).json(error)
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.status(201).send({
                    user_id: parseInt(req.params.user_id),
                    username: req.body.username,
                    email: req.body.email
                });
                //console.log(res);
            }
            
        }
    }

    model.updateByID(data, callback)
};

// deletes the user by providing the user id
// this one still gives out 204 even when the user dont exist
module.exports.deleteUserByID = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByID:", error);
            res.status(500).json(error); // this gives out the error message when an unexpected error comes out
        } else {
            if(results[0].affectedRows == 0) {
                res.status(404).json({
                    // sends in when the user id does not exist
                    message: "User not found"
                });
            } else {
                res.status(204).send(); // 204 No Content - no response in the body    
            }
                     
        } 
    }

    model.deleteUserByID(data, callback);
};

