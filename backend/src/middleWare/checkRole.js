
let AppError = require ("../utilities/AppError")
const authorize = (role) => {
  return (req, res, next) => {

    if (!req.user || req.user.role !== role) {
     
       throw new AppError("only admin can perform this action")
      
      
    }

    next();
  };
};

module.exports = authorize;