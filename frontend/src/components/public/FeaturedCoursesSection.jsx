import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MdPerson, MdLanguage, MdSignalCellularAlt } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

// ─── Static Mock Data ─────────────────────────────────────
const courses = [
  {
    id: 1,
    categoryName: "Web Development",
    teacherName: "Ahmed Hassan",
    title: "Complete React.js Development Course",
    description:
      "Learn React.js from beginner to advanced level and build modern web applications with real projects.",
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=700&q=80",
    language: "English",
    level: "Beginner",
    categoryColor: "#3B82F6",
  },
  {
    id: 2,
    categoryName: "Graphic Design",
    teacherName: "Mohamed Ali",
    title: "Professional Graphic Design Masterclass",
    description:
      "Master Photoshop, Illustrator, branding, and creative design techniques used by professionals.",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80",
    language: "English",
    level: "Intermediate",
    categoryColor: "#EC4899",
  },
  {
    id: 3,
    categoryName: "Digital Marketing",
    teacherName: "Fatima Yusuf",
    title: "Digital Marketing & SEO Fundamentals",
    description:
      "Learn SEO, social media marketing, and content marketing strategies that drive real results.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    language: "English",
    level: "Beginner",
    categoryColor: "#F59E0B",
  },
  {
    id: 4,
    categoryName: "English Language",
    teacherName: "Amina Ahmed",
    title: "English Communication Skills",
    description:
      "Improve speaking, listening, writing, and professional communication skills for your career.",
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&q=80",
    language: "English",
    level: "All Levels",
    categoryColor: "#10B981",
  },
  {
    id: 5,
    categoryName: "Computer Skills",
    teacherName: "Abdullahi Noor",
    title: "Computer Essentials for Beginners",
    description:
      "Build practical computer knowledge for work, study, and daily productivity in the digital age.",
    thumbnail:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=700&q=80",
    language: "English",
    level: "Beginner",
    categoryColor: "#8B5CF6",
  },
  {
    id: 6,
    categoryName: "Business Skills",
    teacherName: "Hassan Mohamed",
    title: "Business & Entrepreneurship Fundamentals",
    description:
      "Learn business planning, entrepreneurship, and leadership skills to grow your career.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    language: "English",
    level: "Intermediate",
    categoryColor: "#EF4444",
  },
];

// ─── Level badge color map ─────────────────────────────────
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

// ─── Teacher Avatar ───────────────────────────────────────
const TeacherAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
      style={{ background: "linear-gradient(135deg, #0F172A, #1D4ED8)" }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

// ─── Course Card ──────────────────────────────────────────
const CourseCard = ({ course }) => {
  const {
    categoryName,
    categoryColor,
    teacherName,
    title,
    description,
    thumbnail,
    language,
    level,
  } = course;

  const levelStyle = LEVEL_STYLES[level] || LEVEL_STYLES["All Levels"];

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-[#10B981]"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
      tabIndex={0}
      aria-label={`${title} — taught by ${teacherName}`}
    >
      {/* Green border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 2px #10B981" }}
      />

      {/* ── Thumbnail ── */}
      <div className="relative h-[220px] overflow-hidden flex-shrink-0">
        <img
          src={thumbnail}
          alt={`${title} course thumbnail`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 items-center justify-center text-5xl font-bold opacity-10"
          style={{
            display: "none",
            background: `${categoryColor}22`,
            color: categoryColor,
          }}
        >
          {categoryName[0]}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm"
            style={{ background: categoryColor }}
          >
            {categoryName}
          </span>
        </div>

        {/* Featured sparkle badge */}
        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <HiSparkles className="w-3 h-3 text-[#10B981]" aria-hidden="true" />
          <span className="text-[10px] font-semibold text-[#0F172A]">
            Featured
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="text-[#0F172A] font-bold text-base leading-snug line-clamp-2 group-hover:text-[#10B981] transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Teacher */}
        <div className="flex items-center gap-2 pt-1">
          <TeacherAvatar name={teacherName} />
          <span className="text-xs font-medium text-gray-500 truncate">
            {teacherName}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Metadata + CTA */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Badges row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Language */}
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1">
              <MdLanguage
                className="w-3 h-3 text-slate-400"
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium text-slate-500">
                {language}
              </span>
            </span>

            {/* Level */}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
            >
              <MdSignalCellularAlt className="w-3 h-3" aria-hidden="true" />
              <span className="text-[11px] font-medium">{level}</span>
            </span>
          </div>

          {/* View Details */}
          <button
            className="group/btn inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:gap-2 transition-all duration-200 focus:outline-none focus-visible:underline"
            aria-label={`View details for ${title}`}
            onClick={(e) => e.stopPropagation()}
          >
            View Details
            <FiArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

// ─── Section Badge ────────────────────────────────────────
const SectionBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
    <span className="text-sm font-semibold text-[#10B981]">{children}</span>
  </div>
);

// ─── Main Section ─────────────────────────────────────────
const FeaturedCoursesSection = () => {
  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden bg-white"
      aria-labelledby="featured-courses-heading"
    >
      {/* Decorative background shapes */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "#10B981", transform: "translate(-40%, -40%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "#0F172A", transform: "translate(40%, 40%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-12 w-56 h-56 rounded-full opacity-[0.03] blur-2xl pointer-events-none"
        style={{ background: "#3B82F6" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <header className="flex flex-col items-center text-center gap-4 mb-14">
          <SectionBadge>Featured Courses</SectionBadge>

          <h2
            id="featured-courses-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight max-w-2xl"
          >
            Learn Practical <span className="text-[#10B981]">Skills</span> From{" "}
            <span className="text-[#10B981]">Expert</span> Instructors
          </h2>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
            Explore our most popular courses designed to help students and
            professionals gain real-world skills and advance their careers.
          </p>
        </header>

        {/* ── Course Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center mt-12">
          <button
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              boxShadow: "0 4px 20px rgba(15,23,42,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #10B981 0%, #059669 100%)";
              e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(16,185,129,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(15,23,42,0.25)";
            }}
          >
            View All Courses
            <FiArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
