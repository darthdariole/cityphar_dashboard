var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "37.27.136.233",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: 3306,
    database: "cityphar_webapp"
});

module.exports = connection;