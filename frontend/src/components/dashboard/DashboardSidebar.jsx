import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineCollection,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineX,
} from "react-icons/hi";

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role;

  const adminMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HiOutlineHome,
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: HiOutlineBookOpen,
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      icon: HiOutlineCollection,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: HiOutlineUsers,
    },
    {
      name: "Enrollments",
      path: "/dashboard/enrollments",
      icon: HiOutlineAcademicCap,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: HiOutlineUser,
    },
  ];

  const teacherMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HiOutlineHome,
    },
    {
      name: "My Courses",
      path: "/dashboard/courses",
      icon: HiOutlineBookOpen,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: HiOutlineUser,
    },
  ];

  const studentMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: HiOutlineHome,
    },
    {
      name: "My Courses",
      path: "/dashboard/courses",
      icon: HiOutlineBookOpen,
    },
    {
      name: "All Courses",
      path: "/dashboard/all-courses",
      icon: HiOutlineAcademicCap,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: HiOutlineUser,
    },
  ];

  let menus = [];

  if (role === "admin") {
    menus = adminMenus;
  } else if (role === "teacher") {
    menus = teacherMenus;
  } else {
    menus = studentMenus;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-20 left-0
          z-50
          w-72
          h-[calc(100vh-80px)]
          bg-[#0F172A]
          border-r border-slate-800
          text-white
          transition-transform
          duration-300
          ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* User Info */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-700">
            <img
              src={`http://localhost:5000/public/${user?.profileImage}`}
              alt={user?.fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#10B981] shadow-lg"
            />

            <h3 className="mt-4 font-semibold text-lg">{user?.fullName}</h3>

            <p className="text-sm text-slate-400 capitalize">{user?.role}</p>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-2">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.name}
                  to={menu.path}
                  end
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#10B981] text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon className="text-xl" />

                  <span className="font-medium">{menu.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Card */}
          {role !== "admin" && (
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 border border-[#10B981]/20">
              <h4 className="font-semibold text-[#10B981]">Masdar Skills</h4>

              <p className="text-sm text-slate-300 mt-2">
                Learn practical skills and build your future with professional
                courses.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
