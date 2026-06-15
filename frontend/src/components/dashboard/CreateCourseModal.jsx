import { HiOutlineX } from "react-icons/hi";

const CreateCourseModal = ({
  open,
  setOpen,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  categories = [],
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Create New Course
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Fill course information below.
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course title"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block mb-2 text-sm font-medium">Slug</label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="react-development-bootcamp"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block mb-2 text-sm font-medium">Duration</label>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="8 Weeks"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block mb-2 text-sm font-medium">Language</label>

              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="English"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block mb-2 text-sm font-medium">Level</label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              >
                <option value="">Select Level</option>

                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium">Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="100"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              >
                <option value="active">Active</option>

                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Intro Video */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Intro Video URL
            </label>

            <input
              type="text"
              name="introVideo"
              value={formData.introVideo}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-2 text-sm font-medium">Thumbnail</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course description..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold hover:bg-emerald-600 transition"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
