import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "./route/route";
import { loginSuccess, logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const readDataFromToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          dispatch(
            loginSuccess({
              user: data.user,
              token,
            }),
          );
        } else {
          localStorage.removeItem("token");
          dispatch(logout());
        }
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
        dispatch(logout());
      }
    };

    readDataFromToken();
  }, [dispatch]);

  return <RouterProvider router={routes} />;
}

export default App;
