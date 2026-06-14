const AppError = require("../utilities/AppError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action")
      );
    }

    next();
  };
};

module.exports = authorize;