const courseService = require("../services/courseService");
const asyncHandler = require("../utilities/asyncHandler");

const createCourse = asyncHandler(async (req, res) => {
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("FILE:", req.file);
  const {
    categoryId,
    teacherId,
    title,
    slug,
    description,
    duration,
    language,
    level,
    price,
    totalStudents,
    status = "draft",
  } = req.body;

  const thumbnail = req.file?.filename || req.body.thumbnail || null;

  const introVideo = req.body.introVideo || null;

  const response = await courseService.createCourse(
    categoryId,
    teacherId,
    title,
    slug,
    description,
    thumbnail,
    introVideo,
    duration,
    language,
    level,
    price,
    totalStudents,
    status,
  );

  res.json(response);
});

const getAllCourses = asyncHandler(async (req, res) => {
  const response = await courseService.getAllCourses();
  res.json(response);
});

const getCourseById = asyncHandler(async (req, res) => {
  const response = await courseService.getCourseById(req.params.id);

  res.json(response);
});

const updateCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    categoryId,
    teacherId,
    title,
    slug,
    description,
    duration,
    language,
    level,
    price,
    totalStudents,
    status,
  } = req.body;

  const thumbnail = req.file?.filename || req.body.thumbnail || null;

  const introVideo = req.body.introVideo || null;

  const response = await courseService.updateCourse(
    id,
    categoryId,
    teacherId,
    title,
    slug,
    description,
    thumbnail,
    introVideo,
    duration,
    language,
    level,
    price,
    totalStudents,
    status,
  );

  res.json(response);
});

const deleteCourse = asyncHandler(async (req, res) => {
  const response = await courseService.deleteCourse(req.params.id);

  res.json(response);
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
