var mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PBL6'
});

  connect.connect(function (err) {
    if(err) console.log("ket noi that bai");
    else console.log("ket noi thanh cong");
});

module.exports = connect;

