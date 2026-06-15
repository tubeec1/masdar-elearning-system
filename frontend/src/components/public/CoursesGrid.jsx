import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CourseCard from "./CourseCard";

const CoursesGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses/read");

      const data = await response.json();

      if (response.ok && data.success) {
        setCourses(data.courses || []);
      } else {
        toast.error(data.message || "Failed to load courses");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          Loading courses...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="text-center text-slate-500">No courses found</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id || course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;
