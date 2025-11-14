import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import AppLayout from "./layout";
import ListCosmeticsPage from "./pages/Cosmetics";
import CosmeticDetailsPage from "./pages/CosmeticDetail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import InventoryPage from "./pages/inventory";
import TransactionHistoryPage from "./pages/Transactions";

import { useAuthStore } from "@/store/useAuthStore";
import PublicUsersPage from "./pages/users";
import NotFoundComponent from "./components/NotFound";

function RequireAuth() {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ListCosmeticsPage /> },
      { path: "users", element: <PublicUsersPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "cosmetic/:id", element: <CosmeticDetailsPage /> },
          { path: "inventory", element: <InventoryPage /> },
          { path: "transactions", element: <TransactionHistoryPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundComponent /> },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <RouterProvider router={router} />;
}
