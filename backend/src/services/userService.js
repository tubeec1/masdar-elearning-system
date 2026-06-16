let authModel = require("../models/authModel");
let readUsers = async () => {
  let response = await authModel.readUsers();
  return {
    success: true,
    message: "Users fetched successfully",
    users: response,
  };
};

module.exports = {
  readUsers,
};
