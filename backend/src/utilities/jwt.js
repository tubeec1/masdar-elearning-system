let jwt = require("jsonwebtoken");
const AppError = require("./AppError");
let generateToken = (user) => {
  let payload = { id: user.id, role: user.role };

  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};

let verifyToken = (token) => {
  try {
    let result = jwt.verify(token, process.env.JWT_SECRET);
    if (!result) {
      throw new AppError("Invalid token", 401);
    }
    let user = {
      id: result.id,
      role: result.role,
    };
    return user;
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
};

module.exports = { generateToken, verifyToken };
