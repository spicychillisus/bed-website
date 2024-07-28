// This handles all endpoint data for ownership
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ownershipController');
//const userController = require('../controllers/userController');

// post sequence: checkUserExists > getUserPoints > checkVehicleExists > checkUserPointsIfEnough > deductUserPoints > createOwnershipRecords 
router.post('/', controller.checkUserExists, controller.getUserPoints, controller.checkVehicleExists, controller.checkUserPointsIfEnough, controller.deductUserPoints, controller.createOwnershipRecords); // adds a ownership record (it also means you bought the vehicle)
router.get('/', controller.viewAllOwnershipRecords); // can view who owns what vehicles
router.get('/:id', controller.viewSpecificOwnershipRecord); // this views specific ownership records
router.delete('/:id', controller.deleteOwnershipRecord); // you delete your record (you sell off your car to nobody and don't get back your points)

module.exports = router;