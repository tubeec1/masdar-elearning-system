let express = require("express");
const authMiddleware = require("../middleWare/authMiddleWare");
const { readUsers } = require("../controrolles/userController");
let router = express.Router();

router.get("/read", authMiddleware, readUsers);

module.exports = router;
