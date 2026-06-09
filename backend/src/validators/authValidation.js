const { body } = require("express-validator");

const signupValidator = [
  body("fullName")
   
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters"),

  body("email")
   
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character"
    ),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be male or female"),

  body("nationality")
  
    .notEmpty()
    .withMessage("Nationality is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Invalid nationality"),

  body("country")
   
    .notEmpty()
    .withMessage("Country is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Invalid country"),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
module.exports = {signupValidator , loginValidator};