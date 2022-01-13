const connection = require('./connection');

function updateState(obj, username) {
    connection.query(`UPDATE userInfo SET state = '${JSON.stringify(obj)}' WHERE username = '${username}'`);
}

module.exports = updateState;