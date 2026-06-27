const asyncHandler = require("../utilities/asyncHandler");
const enrollmentService = require("../services/enrollmentService");

let enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const response =
    await enrollmentService.enrollCourse(
      req.user.id,
      courseId,
    );

  res.json(response);
});

let getMyCourses = asyncHandler(async (req, res) => {
  const response =
    await enrollmentService.getMyCourses(
      req.user.id,
    );

  res.json(response);
});

let getPendingEnrollments = asyncHandler(
  async (req, res) => {
    const response =
      await enrollmentService.getPendingEnrollments();

    res.json(response);
  },
);

let approveEnrollment = asyncHandler(
  async (req, res) => {
    const response =
      await enrollmentService.approveEnrollment(
        req.params.id,
        req.user.id,
      );

    res.json(response);
  },
);

let rejectEnrollment = asyncHandler(
  async (req, res) => {
    const response =
      await enrollmentService.rejectEnrollment(
        req.params.id,
        req.user.id,
      );

    res.json(response);
  },
);

module.exports = {
  enrollCourse,
  getMyCourses,
  getPendingEnrollments,
  approveEnrollment,
  rejectEnrollment,
};
