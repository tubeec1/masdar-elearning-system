let jwt = require("../utilities/jwt");
let AppError = require("../utilities/AppError");
let authMiddleware = async (req, res, next) => {
  let authorization = req.headers.authorization;


  if (!authorization) {
    throw new AppError("There is no token", 401);
  }
  let token = authorization.split(" ")[1];
  let response = await jwt.verifyToken(token);
  if (response.status === false) {
    throw new AppError(response.message, 401);
  }
  req.user = response;
 
  next();
};

module.exports = authMiddleware;
