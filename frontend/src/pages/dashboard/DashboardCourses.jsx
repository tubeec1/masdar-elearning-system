import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import CoursesHeader from "../../components/dashboard/CoursesHeader";
import CreateCourseModal from "../../components/dashboard/CreateCourseModal";
import CoursesTable from "../../components/dashboard/CoursesTable";
import { Toaster } from "react-hot-toast";

const DashboardCourses = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { token, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    categoryId: "",
    teacherId: user?.id || "",
    title: "",
    slug: "",
    description: "",
    thumbnail: null,
    introVideo: "",
    duration: "",
    language: "",
    level: "",
    price: "",
    totalStudents: "",
    status: "published",
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      teacherId: user?.id || "",
    }));
  }, [user]);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories/read");

      const data = await response.json();

      if (response.ok && data.success) {
        setCategories(data.category || []);
      } else {
        toast.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const resetForm = () => {
    setFormData({
      categoryId: "",
      teacherId: user?.id || "",
      title: "",
      slug: "",
      description: "",
      thumbnail: null,
      introVideo: "",
      duration: "",
      language: "",
      level: "",
      price: "",
      totalStudents: "",
      status: "published",
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

    if (!formData.duration.trim()) {
      toast.error("Duration is required");
      return false;
    }

    if (!formData.language.trim()) {
      toast.error("Language is required");
      return false;
    }

    if (!formData.level.trim()) {
      toast.error("Level is required");
      return false;
    }

    if (!formData.price) {
      toast.error("Price is required");
      return false;
    }

    if (!formData.totalStudents) {
      toast.error("Total students is required");
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

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);

      const courseData = new FormData();

      courseData.append("categoryId", formData.categoryId);
      courseData.append("teacherId", user?.id);

      courseData.append("title", formData.title);
      courseData.append("slug", formData.slug);
      courseData.append("description", formData.description);

      courseData.append("thumbnail", formData.thumbnail);

      courseData.append("introVideo", formData.introVideo);
      courseData.append("duration", formData.duration);
      courseData.append("language", formData.language);
      courseData.append("level", formData.level);

      courseData.append("price", Number(formData.price));
      courseData.append("totalStudents", Number(formData.totalStudents));

      courseData.append("status", formData.status);

      const response = await fetch("http://localhost:5000/api/courses/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: courseData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Course created successfully");

        resetForm();
        setOpenModal(false);
      } else {
        toast.error(data.message || "Failed to create course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" reverseOrder={false} />
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
