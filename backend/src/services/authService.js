const authModel = require("../models/authModel.js");
const AppError = require("../utilities/AppError.js");
const jwtHandler = require("../utilities/jwt.js");
const bcrypt = require("bcrypt");

// Halkan   SIGNUP //
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
  const user = await authModel.findByEmail(email);

  if (user) {
    throw new AppError("This email already exists", 409);
  }

  const hashPass = await bcrypt.hash(password, 10);

  const response = await authModel.signup(
    fullName,
    email,
    hashPass,
    gender,
    nationality,
    country,
    role,
    profileImage,
    isActive,
  );

  return {
    status: true,
    message: "Welcome aboard! Your account is ready 🎉",
    user: response,
  };
};

// Halkan LOGIN  //
let login = async (email, password) => {
  const user = await authModel.findByEmail(email);

  if (!user || !user.password) {
    throw new AppError("Invalid email or password", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Incorrect password", 401);
  }

  const token = await jwtHandler.generateToken(user);

  const userData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    nationality: user.nationality,
    country: user.country,
    role: user.role,
    profileImage: user.profileImage,
    isActive: user.isActive,
  };

  return {
    status: true,
    message: "Login successful 😄",
    token,
    user: userData,
  };
};

// Halkaan  CURRENT USER
let getCurrentUser = async (userId) => {
  const user = await authModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    status: true,
    user,
  };
};

// Halkaan UPDATE PROFILE
let updateProfile = async (email, data) => {
  const user = await authModel.findByEmail(email);

  console.log("USER FOUND FOR UPDATE:", user);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  console.log("user data is here from search email", user);

  let profileImage = null;
  if (!data.profileImage) {
    profileImage = user.profileImage;
  } else {
    profileImage = data.profileImage;
  }

  const updatedUser = await authModel.updateProfile(
    email,
    data.fullName,
    data.gender,
    data.nationality,
    data.country,
    profileImage,
  );

  return {
    status: true,
    message: "Profile updated successfully",
    user: updatedUser,
  };
};

// Halkaan CHANGE PASSWORD

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
};
