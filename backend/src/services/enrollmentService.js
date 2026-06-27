const enrollmentModel = require("../models/enrollmentModel");
const AppError = require("../utilities/AppError");

let enrollCourse = async (studentId, courseId) => {
  await enrollmentModel.createEnrollment(
    studentId,
    courseId,
  );

  return {
    success: true,
    message: "Enrollment Request Created",
  };
};

let getMyCourses = async (studentId) => {
  const courses =
    await enrollmentModel.getMyCourses(studentId);

  return {
    success: true,
    courses,
  };
};

let getPendingEnrollments = async () => {
  const enrollments =
    await enrollmentModel.getPendingEnrollments();

  return {
    success: true,
    enrollments,
  };
};

let approveEnrollment = async (
  enrollmentId,
  adminId,
) => {
  await enrollmentModel.updateEnrollmentStatus(
    enrollmentId,
    "approved",
    adminId,
  );

  return {
    success: true,
    message: "Enrollment Approved",
  };
};

let rejectEnrollment = async (
  enrollmentId,
  adminId,
) => {
  await enrollmentModel.updateEnrollmentStatus(
    enrollmentId,
    "rejected",
    adminId,
  );

  return {
    success: true,
    message: "Enrollment Rejected",
  };
};

module.exports = {
  enrollCourse,
  getMyCourses,
  getPendingEnrollments,
  approveEnrollment,
  rejectEnrollment,
};