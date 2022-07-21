const mysql = require('mysql');

async function connect(){
    var con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: "nodejs_study",
    });
    
    con.connect(function (err) {
        if (err) throw err;
        console.log('Connected!');
    });
}

module.exports = { connect }
