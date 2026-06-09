const express = require("express");
const testController = require("../controrolles/testC");

const router = express.Router();

router.get("/read", testController.getTests);

module.exports = router;