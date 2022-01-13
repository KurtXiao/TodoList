const connection = require('./connection');
const constants = require('../constants');

function login(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM userInfo WHERE username = '${username}'`, function(err, results) {
            if(err) reject(err);
            if(results.length === 0) resolve(constants.INVALID_USERNAME); 
            else if(results[0].password !== password) resolve(constants.WRONG_PASSWORD);
            else resolve(true);
        });
    })
}

module.exports = login;