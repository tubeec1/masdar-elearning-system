const express = require("express");
const router = express.Router();

const { uploadCategory } = require("../utilities/multer");

const categoryController = require("../controrolles/categoryController");
const authMiddleware = require("../middleWare/authMiddleWare");
const authorize = require("../middleWare/checkRole");

router.post(
  "/create",
  uploadCategory.single("thumbnail"),
  authMiddleware,
  authorize("admin"),
  categoryController.createCategory,
);

router.get("/read", categoryController.getAllCategories);

router.get("/read/:id", categoryController.getCategoryById);

router.put(
  "/update/:id",
  uploadCategory.single("thumbnail"),
  authMiddleware,
  authorize("admin"),
  categoryController.updateCategory,
);

router.delete(
  "/delete/:id",
  authMiddleware,
  authorize("admin"),
  categoryController.deleteCategory,
);

module.exports = router;
