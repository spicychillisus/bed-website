// SECTION A
// this handles all the required mysql syntax for task
// required module
const pool = require('../services/db');

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM task;
    `

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectByID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM task
    WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertTask = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO task (title, description, points)
    VALUES (?, ?, ?);
    `;

    const VALUES = [data.title, data.description, data.points];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateByID = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE task
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?
    `;

    const VALUES = [data.title, data.description, data.points, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteByID = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM task
    WHERE task_id = ?;
    ALTER TABLE Task AUTO_INCREMENT = 1;
    `
    ;

    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
