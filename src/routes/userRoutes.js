// This handles all endpoint data for user
// required modules
const express = require('express');
const router = express.Router();

const controller = require("../controllers/userController");

// we need to check the email if it exists first then we create the user
router.post('/', controller.duplicateEmailCheck, controller.createNewUser); // it checks if the email already exists and then it creates the new user
router.get('/', controller.readAllUsers); // gets all the users in the database

router.get('/:user_id', controller.readUserByID); // gets the user data
router.put('/:user_id', controller.dupUsernameCheck, controller.duplicateEmailCheck, controller.updateUserByID); // checks for any record of existing username or email, then will update if username or email does not exist
router.delete('/:user_id', controller.deleteUserByID); // deletes the user by providing the id

module.exports = router;