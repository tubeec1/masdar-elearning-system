const express = require("express");
const router = express.Router();
let authMiddleware = require("../middleWare/authMiddleWare");
let authorize = require("../middleWare/checkRole");


const moduleController = require(
  "../controrolles/moduleController.js"
);

router.post(
  "/create",
  authMiddleware,
  authorize("admin", "teacher"),
  moduleController.createModule
);
router.get("/read", moduleController.getAllModules);
router.get("/read/:id", moduleController.getModulesByid);

router.put(
  "/update/:id",
  authMiddleware,
  authorize("admin", "teacher"),
  moduleController.updateModule
);

router.delete(
  "/delete/:id",
  authMiddleware,
  authorize("admin", "teacher"),
  moduleController.deleteModule
);

module.exports = router;