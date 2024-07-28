// This file handles the routing for an API using Express.js and the Router module.
// It sets up different sections of routes and attaches them to the main router.

const express = require('express'); // using express.js
const router = express.Router(); // uses router module
// the below gets the data for the routes
const userRoutes = require('./userRoutes');
const taskProgressRoutes = require('./taskProgressRoutes'); 
const taskRoutes = require('./taskRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const ownershipRoutes = require('../routes/ownershipRoutes');
const messageRoutes = require('../routes/messageRoutes');

// controllers for the routes for login and register
const userController = require('../controllers/userController');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// SECTION A (CA1)
router.use("/task_progress", taskProgressRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

// SECTION B (CA1)
router.use("/vehicles", vehicleRoutes);
router.use("/ownership", ownershipRoutes);

// NEW ROUTES (CA2)
router.use("/messages", messageRoutes)

// login and register routes
router.post("/login", bcryptMiddleware.hashPassword, userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.dupUsernameCheck, userController.duplicateEmailCheck, bcryptMiddleware.hashPassword, userController.createNewUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;    