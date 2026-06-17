

const moduleService = require("../services/moduleService");
const asyncHandler = require("../utilities/asyncHandler");


const createModule = asyncHandler(async (req, res) => {
  const {
    courseId,
    title,
    description,
    moduleOrder
  } = req.body;

  const response = await moduleService.createModule(
    courseId,
    title,
    description,
    moduleOrder
  );

  res.json(response);
});

const getAllModules = asyncHandler(async (req, res) => {
  const response = await moduleService.getAllModules();

  res.json(response);
});

const getModulesByid = asyncHandler(async (req, res) => {
  const response = await moduleService.getModulesByid(
      req.params.id
    );

  res.json(response);
});


const updateModule = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    title,
    description,
    moduleOrder
  } = req.body;

  const response =await moduleService.updateModule(
      id,
      title,
      description,
      moduleOrder
    );

  res.json(response);
});


const deleteModule = asyncHandler(async (req, res) => {
  const response =
    await moduleService.deleteModule(
      req.params.id
    );

  res.json(response);
});

module.exports = {
  createModule,
  getAllModules,
getModulesByid,
  updateModule,
  deleteModule,
};