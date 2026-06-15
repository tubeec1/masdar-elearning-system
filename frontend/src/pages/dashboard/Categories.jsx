import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import CategoriesHeader from "../../components/dashboard/CategoriesHeader";
import CategoriesTable from "../../components/dashboard/CategoriesTable";
import CreateCategoryModal from "../../components/dashboard/CreateCategoryModal";

const Categories = () => {
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: null,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      thumbnail: null,
    });

    setSelectedCategoryId(null);

    setIsEditMode(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: e.target.files[0],
    }));
  };

  const handleEditCategory = (category) => {
    setIsEditMode(true);

    setSelectedCategoryId(category.id);

    setFormData({
      name: category.name,
      description: category.description,
      thumbnail: null,
    });

    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const categoryData = new FormData();

      categoryData.append("name", formData.name);
      categoryData.append("description", formData.description);

      if (formData.thumbnail) {
        categoryData.append("thumbnail", formData.thumbnail);
      }

      let url = "http://localhost:5000/api/categories/create";
      let method = "POST";

      if (isEditMode) {
        url = `http://localhost:5000/api/categories/update/${selectedCategoryId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: categoryData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          isEditMode
            ? "Category updated successfully"
            : "Category created successfully",
        );

        resetForm();

        getCategories();

        setOpenModal(false);
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories/read");

      const data = await response.json();

      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch categories");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" reverseOrder={false} />

      <CategoriesHeader setOpenModal={setOpenModal} resetForm={resetForm} />

      <CategoriesTable
        categories={categories}
        setCategories={setCategories}
        getCategories={getCategories}
        handleEditCategory={handleEditCategory}
      />

      <CreateCategoryModal
        open={openModal}
        setOpen={setOpenModal}
        formData={formData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Categories;
