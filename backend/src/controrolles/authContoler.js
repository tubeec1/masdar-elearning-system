let asyncHandler = require("../utilities/asyncHandler");
let authService = require("../services/authService")
let AppError = require("../utilities/AppError")
let signup = asyncHandler(async(req , res)=>{
    console.log("maxaa dhacay" ,req.body)
let data = req.body;
  let fullName = data.fullName;
  let email = data.email;
  let password = data.password;
  let gender = data.gender;    
  let role = "student";
  let isActive=false
  let nationality= data.nationality;
  let country = data.country;
  let defaultImages = {
  Male: "profileImages/manProfileImage.jpg",
  Female: "profileImages/womanProfileImage.jpg"
};

if (!defaultImages[gender]) {
  throw new AppError("Invalid gender", 400);
}

let profileImage = defaultImages[gender];
 
  const response = await authService.signup(fullName,
    email,
    password,
    gender,
    nationality,
    country,
    role,
    profileImage,
    isActive
  );
 res.json(response);
})
let login = asyncHandler(async (req, res) => {
  let data = req.body;
  let email = data.email;
  let password = data.password;
  let response = await authService.login(email, password);

  return res.json(response);
});
let getCurrentUser = asyncHandler(
  async (req, res) => {
    const response =
      await authService.getCurrentUser(
        req.user.id
      );

    res.json(response);
  }
);
let updateProfile = asyncHandler(async (req, res) => {
  const response = await authService.updateProfile(
    req.user.id,
    req.body
  );

  res.json(response);
});
let changePassword = asyncHandler(async (req, res) => {
  const response= await authService.changePassword(
    req.user.id,
    req.body
  );

  res.json(response);
});
module.exports = {signup , login ,getCurrentUser ,updateProfile,changePassword}