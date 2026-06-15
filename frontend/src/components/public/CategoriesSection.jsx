import React, { useEffect, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { HiBookOpen } from "react-icons/hi";

// ─────────────────────────────────────────────
// Category Card
// ─────────────────────────────────────────────
const CategoryCard = ({ category }) => {
  const { name, description, thumbnail } = category;

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
      style={{
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Hover Border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 2px #10B981" }}
      />

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:5000/public/categories/${thumbnail}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <HiBookOpen className="w-4 h-4 text-[#10B981]" />

          <span className="text-xs font-semibold text-[#0F172A]">Category</span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />

            <span className="text-xs text-slate-400 font-medium">
              Skill Category
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm font-semibold text-[#10B981] group-hover:gap-2 transition-all">
            Explore
            <FiArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

// ─────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────
const SectionBadge = ({ children }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2">
      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />

      <span className="text-sm font-semibold text-[#10B981]">{children}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// Categories Section
// ─────────────────────────────────────────────
const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="relative py-20 bg-slate-50 overflow-hidden">
      {/* Background Effects */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{
          background: "#10B981",
          transform: "translate(40%, -40%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-5"
        style={{
          background: "#0F172A",
          transform: "translate(-40%, 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionBadge>Popular Categories</SectionBadge>

          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-[#0F172A]">
            Explore <span className="text-[#10B981]">Skills</span> Categories
          </h2>

          <p className="mt-5 text-lg text-slate-500 max-w-3xl mx-auto">
            Discover practical learning categories designed to help students,
            professionals and organizations build modern digital skills.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-800">
              No Categories Available
            </h3>

            <p className="mt-3 text-slate-500">
              Categories will appear here once they are created.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-[#10B981] transition-all shadow-lg">
            View All Categories
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
