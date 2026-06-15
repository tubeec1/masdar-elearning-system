import { createBrowserRouter } from "react-router-dom";

// Public Layout
import PublicLayout from "../layouts/PublicLayout";

// Dashboard Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Signin from "../pages/public/Signin";
import Signup from "../pages/public/Signup";

// Dashboard Pages
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import Categories from "../pages/dashboard/Categories";
import Users from "../pages/dashboard/Users";
import Enrollments from "../pages/dashboard/Enrollments";

// Admin + Teacher
import DashboardCourses from "../pages/dashboard/DashboardCourses";

const routes = createBrowserRouter([
  // ================= PUBLIC =================
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "courses",
        element: <DashboardCourses />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "enrollments",
        element: <Enrollments />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default routes;
