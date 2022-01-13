const connection = require('./connection');

function getState(username) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM userInfo WHERE username = '${username}'`, function(err, results) {
            if(err) reject(err);
            resolve(JSON.stringify(results[0].state));
        });
    })
}

module.exports = getState;