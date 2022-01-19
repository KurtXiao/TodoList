const mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'todolistdatabase.cwwgvitfh1as.us-east-1.rds.amazonaws.com',
    user     : 'kurtxiao',
    password : 'huZ87sbe',
    database: 'todolist',
    port: '3306',
});
   
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

module.exports = connection;