import { useSelector } from "react-redux";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const courses = [
  {
    id: 1,
    title: "React Development Bootcamp",
    category: "Web Development",
    teacher: "Mohamed Suleyman",
    students: 120,
    price: 49,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    id: 2,
    title: "Node.js Masterclass",
    category: "Backend Development",
    teacher: "Ahmed Hassan",
    students: 85,
    price: 39,
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    teacher: "Fatima Ali",
    students: 67,
    price: 29,
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];

const CoursesTable = () => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role;

  const canManage = role === "admin" || role === "teacher";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0F172A]">
          {role === "admin"
            ? "All Courses"
            : role === "teacher"
              ? "My Courses"
              : "Enrolled Courses"}
        </h2>

        <p className="text-slate-500 mt-1">
          Manage and track course information.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Course
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Category
              </th>

              {role !== "teacher" && (
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Teacher
                </th>
              )}

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Students
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Price
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              {canManage && (
                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                {/* Course */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-[#0F172A]">
                        {course.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Course ID #{course.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-slate-600">{course.category}</td>

                {/* Teacher */}
                {role !== "teacher" && (
                  <td className="px-6 py-4 text-slate-600">{course.teacher}</td>
                )}

                {/* Students */}
                <td className="px-6 py-4 text-slate-600">{course.students}</td>

                {/* Price */}
                <td className="px-6 py-4 font-semibold text-[#10B981]">
                  ${course.price}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                {/* Actions */}
                {canManage && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <HiOutlineEye className="mx-auto text-lg" />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition">
                        <HiOutlinePencil className="mx-auto text-lg" />
                      </button>

                      <button className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
                        <HiOutlineTrash className="mx-auto text-lg" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <p className="text-sm text-slate-500">
          Showing {courses.length} courses
        </p>
      </div>
    </div>
  );
};

export default CoursesTable;
