// SECTION B
// this handles all the required mysql syntax for ownership
// required module
const pool = require('../services/db');

// quite straightforward - to create a new record
module.exports.createOwnershipRecords = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO ownership (vehicle_id, user_id) 
    VALUES (?, ?);

    `;
    const VALUES = [data.vehicle_id, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// sql statement to get userpoints
module.exports.getUserPoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT CAST(SUM(points) AS UNSIGNED) AS userpoints FROM task
    INNER JOIN taskprogress
    ON task.task_id = taskprogress.task_id
    WHERE taskprogress.user_id = ?;
    `
    // AS UNSIGNED converted the userpoints value to an integer
    const VALUES = [data.user_id] 
    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.checkUserPointsIfEnough = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT points_needed AS pointsneeded FROM vehicle
    WHERE vehicle_id = ?;    
    `;
    // this sql query gets the points needed from the vehicle table
    const VALUES = [data.vehicle_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkVehicleExists = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT COUNT(vehicle_id) AS vehicle_id_count FROM vehicle
    WHERE vehicle_id = ?;
    `;
    // vehicle_id_count is the amount of times a vehicle_id appears and it should only be 1
    // if vehicle_id_count = 0, vehicle does not exist
    const VALUES = [data.vehicle_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// checking if the user exists
module.exports.checkUserExists = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT COUNT(user_id) AS user_id_count FROM user
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// this displays the ownership records
module.exports.viewAllOwnershipRecords = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM ownership;
    `;
    
    pool.query(SQLSTATEMENT, callback);
}

module.exports.viewSpecificOwnershipRecord = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM ownership
    WHERE id = ?;
    `

    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteOwnershipRecord = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM ownership
    WHERE id = ?;

    ALTER TABLE ownership AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}