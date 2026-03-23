import { createBrowserRouter } from "react-router";
import WelcomePage from "./welcome/WelcomePage";
import DashboardPage from "./dashboard/DashboardPage";
import NotFoundPage from "./not-found/NotFoundPage";
import AccountPage from "./profile/AccountPage";
import ProductsPage from "./products/ProductsPage";
import LoginPage from "./root/LoginPage";
import RegisterPage from "./root/RegisterPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
