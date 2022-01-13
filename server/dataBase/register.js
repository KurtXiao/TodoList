const connection = require('./connection');

function register(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM userInfo WHERE username = '${username}'`, function(err, results) {
            if(err) reject(err);
            if(results.length !== 0) resolve(false); 
            let state = {
                labels: [],
                projects: [],
                events: [],
            }
            let sql = `INSERT INTO userInfo (username, password, state) VALUES ('${username}', '${password}', '${JSON.stringify(state)}')`;
            connection.query(sql, function(err, results) {
                if(err) reject(err);
                resolve(true);
            })
            resolve(true);
        });
    })
}

module.exports = register;
