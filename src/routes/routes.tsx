import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { EditMeal } from "../pages/EditMeal";
import { Login } from "../pages/Login";
import { NewMeal } from "../pages/NewMeal";
import { Register } from "../pages/Register";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/meals",
    element: <NewMeal />,
  },
  {
    path: "/meals/:id",
    element: <EditMeal />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
