let con = require("../dbConnection/databaseConnection");

let signup = async (
  fullName,
  email,
  password,
  gender,
  nationality,
  country,
  role,
  profileImage,
  isActive
) => {

  const [result] = await con.execute(
    `INSERT INTO users 
    (fullName, email, password, gender, nationality, country, profileImage, role, isActive)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      email,
      password,
      gender,
      nationality,
      country,
      profileImage,
      role,
      isActive
    ]
  );

  const [rows] = await con.execute(
    "SELECT * FROM users WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};
let findByEmail = async (email) => {
  const [rows] = await con.execute("select * from users where email =?", [
    email,
  ]);

  return rows[0];
};
module.exports = { signup ,findByEmail };