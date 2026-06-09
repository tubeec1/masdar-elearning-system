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
module.exports = {signup , login}