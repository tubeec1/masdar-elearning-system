const lessonService = require("../services/lessonService");
const asyncHandler = require("../utilities/asyncHandler");


const createLesson = asyncHandler(async (req, res) => {
  const {
    moduleId,
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  } = req.body;

  const response = await lessonService.createLesson(
    moduleId,
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  );

  res.json(response);
});

// GET BY MODULE
const getLessonsByModule = asyncHandler(async (req, res) => {
  const response = await lessonService.getLessonsByModule(
    req.params.moduleId
  );

  res.json(response);
});



const getAllLessons = asyncHandler(async (req, res) => {
  const response = await lessonService.getAllLessons();

  res.json(response);
});



const getLessonById = asyncHandler(async (req, res) => {
  const response = await lessonService.getLessonById(
    req.params.id
  );

  res.json(response);
});


const updateLesson = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  } = req.body;

  const response = await lessonService.updateLesson(
    req.params.id,
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  );

  res.json(response);
});


const deleteLesson = asyncHandler(async (req, res) => {
  const response = await lessonService.deleteLesson(
    req.params.id
  );

  res.json(response);
});

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByModule,
  getLessonById,
  updateLesson,
  deleteLesson,
};