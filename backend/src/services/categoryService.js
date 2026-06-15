const categoryModel = require("../models/categoryModel");
const AppError = require("../utilities/AppError");

const createCategory = async (name, description, status, thumbnail) => {
  const response = await categoryModel.createCategory(
    name,
    description,
    status,
    thumbnail,
  );

  return {
    success: true,
    message: "Category created successfully",
    category: response,
  };
};

const getAllCategories = async () => {
  const response = await categoryModel.getAllCategories();

  return {
    success: true,
    message: "Categories retrieved successfully",
    category: response,
  };
};

const getCategoryById = async (id) => {
  const response = await categoryModel.getCategoryById(id);

  if (!response) {
    throw new AppError("Category not found");
  }

  return {
    success: true,
    message: "Category retrieved successfully",
    category: response,
  };
};

const updateCategory = async (id, name, description, thumbnail) => {
  const response = await categoryModel.updateCategory(
    id,
    name,
    description,
    thumbnail,
  );

  return {
    success: true,
    message: "Category updated successfully",
    category: response,
  };
};

const deleteCategory = async (id) => {
  await categoryModel.deleteCategory(id);

  return {
    success: true,
    message: "Category deleted successfully",
  };
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
