
const categoryService = require("../services/categoryService");
let asyncHandler = require("../utilities/asyncHandler")
const createCategory = asyncHandler(async (req, res) => {

 

  let data = req.body;

  let name = data.name;
  let description = data.description;
  let status = true;

  const thumbnail =
    req.file?.filename || req.body.thumbnail || null;

  const response = await categoryService.createCategory(
    name,
    description,
    status,
    thumbnail
  );

  res.json(response);
});

const getAllCategories = asyncHandler( async (req, res) => {
 const response= await categoryService.getAllCategories();

  res.json(response)
 
});

const getCategoryById = asyncHandler (async (req, res) => {
  const id = req.params.id;
 const response = await categoryService.getCategoryById(id);
    
    
    res.json(response)
 
});

const updateCategory = asyncHandler(async (req, res) => {

  const id = req.params.id;
  const { name, description } = req.body;

  const thumbnail =
    req.file?.filename || req.body.thumbnail || null;

  const response = await categoryService.updateCategory(
    id,
    name,
    description,
    thumbnail
  );

  console.log("maxaa kujira", req.body);

  res.json(response);
});

const deleteCategory = async (req, res) => {
let id =req.params.id;
const response= await categoryService.deleteCategory(id);

    res.json(response);
 
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};