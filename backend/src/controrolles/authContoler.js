let asyncHandler = require("../utilities/asyncHandler");
let authService = require("../services/authService");
let AppError = require("../utilities/AppError");

// Signup Controller Function
let signup = asyncHandler(async (req, res) => {
  console.log("maxaa dhacay", req.body);
  let data = req.body;
  let fullName = data.fullName;
  let email = data.email;
  let password = data.password;
  let gender = data.gender;
  let role = "student";
  let isActive = true;
  let nationality = data.nationality;
  let country = data.country;
  let defaultImages = {
    Male: "profileImages/manProfileImage.jpg",
    Female: "profileImages/womanProfileImage.jpg",
  };

  if (!defaultImages[gender]) {
    throw new AppError("Invalid gender", 400);
  }

  let profileImage = defaultImages[gender];

  const response = await authService.signup(
    fullName,
    email,
    password,
    gender,
    nationality,
    country,
    role,
    profileImage,
    isActive,
  );
  res.json(response);
});

// Login Controller Function
let login = asyncHandler(async (req, res) => {
  let data = req.body;
  let email = data.email;
  let password = data.password;
  let response = await authService.login(email, password);

  return res.json(response);
});
// Get Current User Controller Function
let getCurrentUser = asyncHandler(async (req, res) => {
  const response = await authService.getCurrentUser(req.user.id);

  res.json(response);
});
// Update Profile Controller Function
let updateProfile = asyncHandler(async (req, res) => {
  let data = req.body;
  let email = req.user.email;
  console.log("EMAIL PARAMETER:", email);
  console.log("REQUEST BODY:", data);
  const response = await authService.updateProfile(email, data);

  res.json(response);
});

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
};
