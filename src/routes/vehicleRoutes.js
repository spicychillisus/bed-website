// This handles all endpoint data for vehicle

const express = require('express');
const router = express.Router();
const controller = require('../controllers/vehicleController');


router.post('/', controller.categoryCheck, controller.pointsCheck, controller.createNewVehicle); // insert a new vehicle
router.get('/', controller.getAllVehicle); // get all vehicles

router.get("/:vehicle_id", controller.readVehicleID); // retrives vehicle information
// this checks if the vehicle name and vehicle description already exists to prevent duplicates
router.put("/:vehicle_id", controller.updateVehicleDetails); // updates vehicle details by providing id
router.delete("/:vehicle_id", controller.deleteVehicleByID) // deletes vehicle details by providing id



module.exports = router;