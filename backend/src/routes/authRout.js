const express = require("express");
const { validationMiddleware } = require("../middleWare/validationMiddeleWare");
let authMiddleware = require ("../middleWare/authMiddleWare.js")
const authControler = require("../controrolles/authContoler");
let {
  signupValidator , loginValidator
 
} = require("../validators/authValidation"); 

const router = express.Router();

router.post("/signup", signupValidator,validationMiddleware,authControler.signup);
router.post("/login", loginValidator,validationMiddleware, authControler.login);
router.get(
  "/me",
  authMiddleware,
 authControler.getCurrentUser
);
router.put(
  "/me-updated",
  authMiddleware,
  authControler.updateProfile
);
router.put(
  "/change-password",
  authMiddleware,
authControler.changePassword
);

module.exports = router;