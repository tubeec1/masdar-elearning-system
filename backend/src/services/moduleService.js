

const moduleModel = require("../models/moduleModel");
const AppError = require("../utilities/AppError");
const db = require("../dbConnection/databaseConnection");

const createModule = async (
  courseId,
  title,
  description,
  moduleOrder
) => {

     const [course] = await db.execute(
    "SELECT id FROM courses WHERE id = ?",
    [courseId]
  );

  if (course.length === 0) {
    throw new AppError(
      "Invalid courseId: course does not exist"
    );
  }
   const response = await moduleModel.createModule(
    courseId,
    title,
    description,
    moduleOrder
  );
    
  return {
    success: true,
    message: "Module created successfully",
    module: response,
  };
};
  const getAllModules = async () => {
  const response = await moduleModel.getAllModules();

  return {
    success: true,
    message: "Modules fetched successfully",
    modules: response,
  };
};
const getModulesByid = async (id) => {
  const response =await moduleModel.getModulesByid(id);

  return {
    success: true,
    message: "Modules fetched successfully",
    modules: response,
  };
};

const updateModule = async (
  id,
  title,
  description,
  moduleOrder
) => {
  await moduleModel.updateModule(
    id,
    title,
    description,
    moduleOrder
  );

  return {
    success: true,
    message: "Module updated successfully",
  };
};

const deleteModule = async (id) => {
  await moduleModel.deleteModule(id);

  return {
    success: true,
    message: "Module deleted successfully",
  };
};

module.exports = {
  createModule,
  getAllModules,
  getModulesByid,
  updateModule,
  deleteModule,
};