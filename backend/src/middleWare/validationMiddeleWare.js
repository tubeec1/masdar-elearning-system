let { validationResult } = require("express-validator");
const AppError = require("../utilities/AppError");

let validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors", errors);

  if (!errors.isEmpty()) {
    throw new AppError(errors.errors[0].msg, 400);
  }
  next();
};

module.exports = { validationMiddleware };