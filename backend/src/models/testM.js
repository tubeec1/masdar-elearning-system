const con = require("../dbConnection/databaseConnection");

const getTestsM = async () => {
    const [rows] = await con.execute("SELECT * FROM users");
    return rows;
};

module.exports = { getTestsM };