const courseModel = require("../models/courseModel");
const AppError = require("../utilities/AppError");

const createCourse = async (...data) => {
  const response = await courseModel.createCourse(
    ...data
  );

  return {
    success: true,
    message: "Course created successfully",
    course: response,
  };
};

const getAllCourses = async () => {
  const response = await courseModel.getAllCourses();

  return {
    success: true,
    message: "Courses fetched successfully",
    courses: response,
  };
};

const getCourseById = async (id) => {
  const response = await courseModel.getCourseById(id);

  if (!response) {
    throw new AppError("Course not found");
  }

  return {
    success: true,
    message: "Course fetched successfully",
    course: response,
  };
};

const updateCourse = async (...data) => {
  const response = await courseModel.updateCourse(
    ...data
  );

  return {
    success: true,
    message: "Course updated successfully",
    course: response,
  };
};

const deleteCourse = async (id) => {
  await courseModel.deleteCourse(id);

  return {
    success: true,
    message: "Course deleted successfully",
  };
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};