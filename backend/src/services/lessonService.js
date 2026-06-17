const lessonModel = require("../models/lessonModel");
const AppError = require("../utilities/AppError");
const db = require("../dbConnection/databaseConnection");


const createLesson = async (
  moduleId,
  title,
  description,
  videoUrl,
  duration,
  lessonOrder
) => {
 
  const [module] = await db.execute(
    "SELECT id FROM modules WHERE id = ?",
    [moduleId]
  );

  if (module.length === 0) {
    throw new AppError("Invalid moduleId: module does not exist");
  }

  const response = await lessonModel.createLesson(
    moduleId,
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  );

  return {
    success: true,
    message: "Lesson created successfully",
    lesson: response,
  };
};

// GET LESSONS BY MODULE
const getLessonsByModule = async (moduleId) => {
  const response = await lessonModel.getLessonsByModule(moduleId);

  return {
    success: true,
    message: "Lessons fetched successfully",
    lessons: response,
  };
};


const getAllLessons = async () => {
  const response = await lessonModel.getAllLessons();

  return {
    success: true,
    message: "All lessons fetched successfully",
    lessons: response,
  };
};



const getLessonById = async (id) => {
  const response = await lessonModel.getLessonById(id);

  return {
    success: true,
    message: "Lesson fetched successfully",
    lesson: response,
  };
};


const updateLesson = async (
  id,
  title,
  description,
  videoUrl,
  duration,
  lessonOrder
) => {
  await lessonModel.updateLesson(
    id,
    title,
    description,
    videoUrl,
    duration,
    lessonOrder
  );

  return {
    success: true,
    message: "Lesson updated successfully",
  };
};


const deleteLesson = async (id) => {
  await lessonModel.deleteLesson(id);

  return {
    success: true,
    message: "Lesson deleted successfully",
  };
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonsByModule,
  getLessonById,
  updateLesson,
  deleteLesson,
};