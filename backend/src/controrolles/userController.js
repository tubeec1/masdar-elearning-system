const asyncHandler = require("../utilities/asyncHandler");
const userService = require("../services/userService");
const AppError = require("../utilities/AppError");

let readUsers = asyncHandler(async (req, res) => {
  let user = req.user;
  if (user.role !== "admin") {
    throw new AppError("You are not authorized to perform this action", 401);
  }

  const response = await userService.readUsers();

  res.json(response);
});

module.exports = {
  readUsers,
};
