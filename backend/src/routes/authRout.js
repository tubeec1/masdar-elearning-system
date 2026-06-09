const express = require("express");
const { validationMiddleware } = require("../middleWare/validationMiddeleWare");
const authControler = require("../controrolles/authContoler");
let {
  signupValidator , loginValidator
 
} = require("../validators/authValidation"); 

const router = express.Router();

router.post("/signup", signupValidator,validationMiddleware,authControler.signup);
router.post("/login", loginValidator,validationMiddleware,authControler.login);

module.exports = router;