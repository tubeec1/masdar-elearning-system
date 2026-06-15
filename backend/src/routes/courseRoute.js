const express = require("express");
const router = express.Router();
const courseController = require("../controrolles/courseController");
let authMiddleware = require("../middleWare/authMiddleWare");
let authorize = require("../middleWare/checkRole");
const { uploadCourse } = require("../utilities/multer");

router.post(
  "/create",
  uploadCourse.single("thumbnail"),
  authMiddleware,
  authorize("admin", "teacher"),
  courseController.createCourse,
);

router.get("/read", courseController.getAllCourses);

router.get("/read/:id", courseController.getCourseById);

router.put(
  "/update/:id",
  authMiddleware,
  authorize("admin", "teacher"),
  uploadCourse.single("thumbnail"),
  courseController.updateCourse,
);

router.delete(
  "/delete/:id",
  authMiddleware,
  authorize("admin", "teacher"),
  courseController.deleteCourse,
);

module.exports = router;
