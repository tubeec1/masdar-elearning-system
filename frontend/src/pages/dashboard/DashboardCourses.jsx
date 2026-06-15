import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import CoursesHeader from "../../components/dashboard/CoursesHeader";
import CreateCourseModal from "../../components/dashboard/CreateCourseModal";
import CoursesTable from "../../components/dashboard/CoursesTable";

const DashboardCourses = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    slug: "",
    description: "",
    thumbnail: null,
    introVideo: "",
    duration: "",
    language: "",
    level: "",
    price: "",
    status: "active",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories/read");

      const data = await response.json();

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
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

  const resetForm = () => {
    setFormData({
      categoryId: "",
      title: "",
      slug: "",
      description: "",
      thumbnail: null,
      introVideo: "",
      duration: "",
      language: "",
      level: "",
      price: "",
      status: "active",
    });
  };

  const validateForm = () => {
    if (!formData.categoryId) {
      toast.error("Please select category");
      return false;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (!formData.slug.trim()) {
      toast.error("Slug is required");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!formData.thumbnail) {
      toast.error("Thumbnail is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const courseData = new FormData();

      courseData.append("categoryId", formData.categoryId);
      courseData.append("title", formData.title);
      courseData.append("slug", formData.slug);
      courseData.append("description", formData.description);
      courseData.append("thumbnail", formData.thumbnail);
      courseData.append("introVideo", formData.introVideo);
      courseData.append("duration", formData.duration);
      courseData.append("language", formData.language);
      courseData.append("level", formData.level);
      courseData.append("price", formData.price);
      courseData.append("status", formData.status);

      const response = await fetch("http://localhost:5000/api/courses/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: courseData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        resetForm();

        setOpenModal(false);

        // refresh courses later
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <CoursesHeader setOpenModal={setOpenModal} />

      <CoursesTable />

      <CreateCourseModal
        open={openModal}
        setOpen={setOpenModal}
        formData={formData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default DashboardCourses;
