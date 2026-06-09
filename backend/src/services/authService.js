let authModel = require ("../models/authModel.js")
let AppError = require ("../utilities/AppError.js")
let jwtHandler = require("../utilities/jwt.js");
const bcrypt = require("bcrypt");
let signup = async (  fullName,
    email,
    password,
    gender,
    nationality,
    country,
    role,
    profileImage,
    isActive )=>{
    let user = await authModel.findByEmail(email);
   if (user && user.length > 0) {
    throw new AppError("this email is already exist", 409);
  }
let hashPass = await bcrypt.hash(password, 10);
 let response =  await authModel.signup(fullName,
    email,
    hashPass,
    gender,
    nationality,
    country,
    role,
    profileImage,
    isActive );
   return{
    status :"true",
    message: "Welcome aboard! Your account is ready 🎉",
    user:response
 }

}
let login = async (email, password) => {
  const user = await authModel.findByEmail(email);

  if (!user) {
    throw new AppError("this email is not exist", 404);
  }

  let isMatch = await bcrypt.compare(String(password), user.password);

  if (!isMatch) {
    throw new AppError("incorect password", 401);
  }
  let token = await jwtHandler.generateToken(user);
  let userData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    nationality:user.nationality,
    country:user.country,
    role: user.role,
    profileImage: user.profileImage,
    isActive: user.isActive
  };
  return {
    status: true,
    message: "Nice to see you again 😄 Login successful!",
    token: token,
    user: userData,
  };
};

module.exports ={signup , login}