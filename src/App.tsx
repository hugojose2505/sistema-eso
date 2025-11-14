import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import ListCosmeticsPage from "./pages/Cosmetics";
import CosmeticDetailsPage from "./pages/CosmeticDetail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import InventoryPage from "./pages/inventory";
import TransactionHistoryPage from "./pages/Transactions";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ListCosmeticsPage /> },
      { path: "cosmetic/:id", element: <CosmeticDetailsPage /> },
      {path: "inventory", element: <InventoryPage />},
      {path: "transactions", element: <TransactionHistoryPage /> }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }


]);

export default function App() {
  return <RouterProvider router={router} />;
}
