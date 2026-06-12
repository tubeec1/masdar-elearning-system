const express = require("express");
const router = express.Router();
let upload = require("../utilities/multer");
const categoryController = require("../controrolles/categoryController");
let authMiddleware = require ("../middleWare/authMiddleWare")
let authorize = require("../middleWare/checkRole");

router.post(
  "/create",
  upload.single("thumbnail"),
  authMiddleware,
  authorize("admin"),
  categoryController.createCategory
);;


router.get("/read", categoryController.getAllCategories);


router.get("/read/:id", categoryController.getCategoryById);


router.put(
  "/update/:id",
  upload.single("thumbnail"),
  authMiddleware,
  authorize("admin"),
  categoryController.updateCategory
);

router.delete(
  "/delete/:id",
  upload.single("thumbnail"),
  authMiddleware,
  authorize("admin"),
  categoryController.deleteCategory
);

module.exports = router;