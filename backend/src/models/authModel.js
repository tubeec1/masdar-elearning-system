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
  isActive,
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
      isActive,
    ],
  );

  const [rows] = await con.execute("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);

  return rows[0];
};
let findByEmail = async (email) => {
  const [rows] = await con.execute("select * from users where email =?", [
    email,
  ]);

  return rows[0];
};
let findById = async (id) => {
  const [rows] = await con.execute("SELECT * FROM users WHERE id = ?", [id]);

  return rows[0];
};
let updateProfile = async (
  email,
  fullName,
  gender,
  nationality,
  country,
  profileImage,
) => {
  const [result] = await con.execute(
    `UPDATE users 
     SET fullName=?,
         gender=?,
         nationality=?,
         country=?,
         profileImage=?
     WHERE email=?`,
    [fullName, gender, nationality, country, profileImage, email],
  );

  return result;
};
let updatePassword = async (userId, password) => {
  const [result] = await con.execute(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, userId],
  );

  return result;
};

//read users
let readUsers = async () => {
  const [rows] = await con.execute("SELECT * FROM users");
  return rows;
};
module.exports = {
  signup,
  findByEmail,
  findById,
  updateProfile,
  updatePassword,
  readUsers,
};
