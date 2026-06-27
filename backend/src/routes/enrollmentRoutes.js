const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleWare/authMiddleWare");
const authorize = require("../middleWare/checkRole");
const enrollmentController = require(
  "../controrolles/enrollmentController",
);

router.post(
  "/create",
  authMiddleware,
  enrollmentController.enrollCourse,
);

router.get(
  "/my-courses",
  authMiddleware,
  enrollmentController.getMyCourses,
);

router.get(
  "/pending",
  authMiddleware,
  enrollmentController.getPendingEnrollments,
);

router.put(
  "/:id/approve",
  authMiddleware,
   authorize("admin"),
  enrollmentController.approveEnrollment,
);

router.put(
  "/:id/reject",
  authMiddleware,
   authorize("admin"),
  enrollmentController.rejectEnrollment,
);

module.exports = router;