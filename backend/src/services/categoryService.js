const categoryModel = require("../models/categoryModel");
<<<<<<< HEAD
let AppError = require("../utilities/AppError");
const createCategory = async (name, description, status, thumbnail) => {
  const response = await categoryModel.createCategory(
    name,
    description,
    status,
    thumbnail,
  );

  return {
    success: "true",
    message: "successfully created",
    category: response,
  };
};

const getAllCategories = async () => {
  const response = await categoryModel.getAllCategories();
  return {
    success: "true",
    message: "reading succefully",
    category: response,
  };
};

const getCategoryById = async (id) => {
  const response = await categoryModel.getCategoryById(id);

  if (!response) {
    throw new AppError("Category not found");
  }
  return {
    success: "true",
    message: "reading succefully",
    category: response,
  };
};

const updateCategory = async (id, name, description, thumbnail) => {
=======
let AppError = require("../utilities/AppError")
const createCategory = async (name ,description ,status ,thumbnail) => {
const response=  await categoryModel.createCategory(name ,description ,status,thumbnail );

 return {
   status:"true",
   message:"successfully created",
   category:response
 }
};

const getAllCategories = async () => {
const response = await categoryModel.getAllCategories();
return{
  status:"true",
  message:"reading succefully",
  category:response
}
};

const getCategoryById = async (id) => {

const response =await categoryModel.getCategoryById(id);

if(!response){
  throw new AppError("Category not found")
}
return{
  status:"true",
  message:"reading succefully",
  category:response
}
};

const updateCategory = async (id, name, description, thumbnail) => {

>>>>>>> muna
  const response = await categoryModel.updateCategory(
    id,
    name,
    description,
<<<<<<< HEAD
    thumbnail,
  );

  return {
    success: "true",
    message: "Category updated successfully",
    category: response,
  };
};
const deleteCategory = async (id) => {
  const response = await categoryModel.deleteCategory(id);
  return {
    success: true,
    message: "Category deleted successfully",
  };
=======
    thumbnail
  );

  return {
    success: true,
    message: "Category updated successfully",
    category: response
  };
};
const deleteCategory = async (id) => {
  const response= await categoryModel.deleteCategory(id);
  return{
  success: true,
   message: "Category deleted successfully",
  }
>>>>>>> muna
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
<<<<<<< HEAD
};
=======
};
>>>>>>> muna
