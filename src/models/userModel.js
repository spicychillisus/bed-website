
// SECTION A
// this handles all the required mysql syntax for user handling
// required module
const pool = require('../services/db');

// code for getting all users
module.exports.selectAll = (callback) => {

    const SQLSTATEMENT = `
    SELECT * FROM user;
    `;

    pool.query(SQLSTATEMENT, callback)
};

// sql code for getting individual user data
module.exports.selectByID = (data, callback) => {

    const SQLSTATEMENT = `
    SELECT user.user_id, user.username, user.email, SUM(task.points) AS userpoints
    FROM user
    LEFT JOIN taskprogress ON user.user_id = taskprogress.user_id
    LEFT JOIN task ON taskprogress.task_id = task.task_id
    WHERE user.user_id = ?
    GROUP BY user.user_id, user.username, user.email;
    `

    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback)
}

// has the same function as selectByID, but this one is for login purposes
module.exports.login = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE username = ? AND password = ?;
    `;

    const VALUES = [data.username, data.password];
    pool.query(SQLSTATEMENT, VALUES, callback);

}

// this will add a new user into the user and pointhandle table
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `
    ;

    const VALUES = [data.username, data.email, data.password];
    pool.query(SQLSTATEMENT, VALUES, callback)
};

// checking for duplicate email using count function
module.exports.checkForDuplicateEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT count(email) AS count FROM user
    WHERE email = ?;
    ;
    `;
    const VALUES = [data.email];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// checking for duplicate username using count function
module.exports.checkForDuplicateUsername = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT count(username) AS count FROM user
    WHERE username = ?;
    ;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// updates by providing user ID
module.exports.updateByID = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE user 
    SET username = ?, email = ? 
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// deletes by providing user ID
module.exports.deleteUserByID = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM User
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};