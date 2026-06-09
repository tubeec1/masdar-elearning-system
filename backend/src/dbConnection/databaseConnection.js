const mysql = require("mysql2");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mona",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = con.promise();