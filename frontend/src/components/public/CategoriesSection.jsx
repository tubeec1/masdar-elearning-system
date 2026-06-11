import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import {
  MdCode,
  MdBrush,
  MdCampaign,
  MdMenuBook,
  MdComputer,
  MdBusinessCenter,
} from "react-icons/md";
import { HiBookOpen } from "react-icons/hi";

// ─── Static Data ──────────────────────────────────────────
const categories = [
  {
    id: 1,
    name: "Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and modern web technologies.",
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80",
    courses: 22,
    icon: MdCode,
    accent: "#3B82F6",
  },
  {
    id: 2,
    name: "Graphic Design",
    description:
      "Master Photoshop, Illustrator, branding, and creative design skills.",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    courses: 18,
    icon: MdBrush,
    accent: "#EC4899",
  },
  {
    id: 3,
    name: "Digital Marketing",
    description:
      "Learn SEO, social media marketing, content marketing, and online advertising.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    courses: 15,
    icon: MdCampaign,
    accent: "#F59E0B",
  },
  {
    id: 4,
    name: "English Language",
    description:
      "Improve speaking, writing, listening, and professional communication skills.",
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    courses: 12,
    icon: MdMenuBook,
    accent: "#10B981",
  },
  {
    id: 5,
    name: "Computer Skills",
    description:
      "Build practical computer knowledge for work, study, and daily productivity.",
    thumbnail:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
    courses: 9,
    icon: MdComputer,
    accent: "#8B5CF6",
  },
  {
    id: 6,
    name: "Business Skills",
    description:
      "Develop entrepreneurship, leadership, and professional business skills.",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    courses: 14,
    icon: MdBusinessCenter,
    accent: "#EF4444",
  },
];

// ─── Category Card ────────────────────────────────────────
const CategoryCard = ({ category }) => {
  const {
    name,
    description,
    thumbnail,
    courses,
    icon: Icon,
    accent,
  } = category;

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent cursor-pointer"
      style={{
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
      aria-label={`${name} — ${courses} courses`}
    >
      {/* Green border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 2px #10B981" }}
      />

      {/* ── Thumbnail ── */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={thumbnail}
          alt={`${name} category thumbnail`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* Fallback if image fails */}
        <div
          className="absolute inset-0 items-center justify-center"
          style={{
            display: "none",
            background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
          }}
        >
          <Icon className="w-16 h-16 opacity-30" style={{ color: accent }} />
        </div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category icon badge */}
        <div
          className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: accent }}
        >
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>

        {/* Courses badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <HiBookOpen
            className="w-3.5 h-3.5 text-[#10B981]"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-[#0F172A]">
            {courses} Courses
          </span>
        </div>

        {/* Name overlay on bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3 className="text-lg font-bold text-white leading-tight">{name}</h3>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#10B981" }}
            />
            <span className="text-xs font-medium text-gray-400">
              Practical Skills
            </span>
          </div>

          <span
            className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
            style={{ color: "#10B981" }}
          >
            Explore
            <FiArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
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
const CategoriesSection = () => {
  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden bg-slate-50"
      aria-labelledby="categories-heading"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "#10B981", transform: "translate(40%, -40%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "#0F172A", transform: "translate(-40%, 40%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-[0.04] blur-2xl pointer-events-none"
        style={{ background: "#3B82F6", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <header className="flex flex-col items-center text-center gap-4 mb-14">
          <SectionBadge>Popular Categories</SectionBadge>

          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight"
          >
            Explore <span className="text-[#10B981]">Skills</span> Categories
          </h2>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
            Discover a variety of practical skill categories designed to help
            students and professionals achieve their career goals.
          </p>
        </header>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* ── CTA Button ── */}
        <div className="flex justify-center mt-12">
          <button
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
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
            View All Categories
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

export default CategoriesSection;
