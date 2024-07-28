const pool = require('../services/db');

// creating new message
module.exports.insertNewMessage = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO messages (user_id, message) 
    VALUES (?, ?)
    `;
    const VALUES = [data.user_id, data.message];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.seeAllMessages = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM messages
    `;
    pool.query(SQLSTATEMENT, callback);
}

module.exports.viewMessage = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM messages WHERE message_id = ?
    `;
    const VALUES = [data.message_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.editMessage = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE messages SET message = ? WHERE message_id = ?
    `;
    const VALUES = [data.message, data.message_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteMessageWithID = (data, callback) => {  
    const SQLSTATEMENT = `
    DELETE FROM messages WHERE message_id = ?
    `;
    const VALUES = [data.message_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}