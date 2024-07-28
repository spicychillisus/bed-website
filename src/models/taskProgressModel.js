// SECTION A
// this handles all the required mysql syntax for task progress
// required module
const pool = require('../services/db');

module.exports.selectAll = (callback) => {

    const SQLSTATEMENT = `
    SELECT * FROM taskprogress;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectByProgressID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM taskprogress
    WHERE progress_id = ?;
    `
    ;

    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectByUserID = (data, callback) => {

    const SQLSTATEMENT = `
    SELECT * FROM taskprogress
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectByTaskID = (data, callback) => {

    const SQLSTATEMENT = `
    SELECT FROM * taskprogress
    WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT ,VALUES ,callback);
}

module.exports.checkUserID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT COUNT(user.user_id) AS user_count
    FROM user
    WHERE user.user_id = ?; 
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkTaskID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT COUNT(task.task_id) AS task_count
    FROM task
    WHERE task.task_id = ?;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT, VALUES , callback);
}

/* module.exports.checkID = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT 
    (SELECT COUNT(*) FROM user WHERE user_id = taskprogress.user_id) AS user_exists,
    (SELECT COUNT(*) FROM task WHERE task_id = taskprogress.task_id) AS task_exists
    FROM taskprogress
    WHERE taskprogress.user_id = ? AND taskprogress.task_id = ?
    LIMIT 1;
    `
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
} */

module.exports.insertTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?)
    `;

    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE taskprogress
    SET notes = ?
    WHERE progress_id = ?
    `;

    const VALUES = [data.notes, data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteByID = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM taskprogress
    WHERE progress_id = ?;
    ALTER TABLE taskprogress AUTO_INCREMENT = 1;
    
    `;

    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

