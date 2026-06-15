import { useEffect, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MdLanguage, MdSignalCellularAlt } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import toast from "react-hot-toast";

const LEVEL_STYLES = {
  Beginner: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
  Intermediate: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  Advanced: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-100",
  },
  "All Levels": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

const TeacherAvatar = ({ name }) => {
  const initials = (name || "IN")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
      style={{ background: "linear-gradient(135deg, #0F172A, #1D4ED8)" }}
    >
      {initials}
    </div>
  );
};

const CourseCard = ({ course }) => {
  const levelStyle = LEVEL_STYLES[course.level] || LEVEL_STYLES["All Levels"];

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
    >
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={`http://localhost:5000/public/courses/${course.thumbnail}`}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-3.5 left-3.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-[#10B981]">
            {course.categoryName || "Course"}
          </span>
        </div>

        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <HiSparkles className="w-3 h-3 text-[#10B981]" />
          <span className="text-[10px] font-semibold text-[#0F172A]">
            Featured
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-[#0F172A] font-bold text-base leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <TeacherAvatar name={course.teacherName || "Instructor"} />

          <span className="text-xs font-medium text-gray-500">
            {course.teacherName || "Instructor"}
          </span>
        </div>

        <div className="border-t border-gray-100" />

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
              <MdLanguage className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500">
                {course.language || "English"}
              </span>
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
            >
              <MdSignalCellularAlt className="w-3 h-3" />
              <span className="text-[11px] font-medium">
                {course.level || "Beginner"}
              </span>
            </span>
          </div>

          <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981]">
            View Details
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

const SectionBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
    <span className="text-sm font-semibold text-[#10B981]">{children}</span>
  </div>
);

const FeaturedCoursesSection = () => {
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

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col items-center text-center gap-4 mb-14">
          <SectionBadge>Featured Courses</SectionBadge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight max-w-2xl">
            Learn Practical <span className="text-[#10B981]">Skills</span> From{" "}
            <span className="text-[#10B981]">Expert</span> Instructors
          </h2>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
            Explore our most popular courses designed to help students and
            professionals gain real-world skills.
          </p>
        </header>

        {loading ? (
          <div className="text-center py-20">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {courses.map((course) => (
              <CourseCard key={course.id || course._id} course={course} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            }}
          >
            View All Courses
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
