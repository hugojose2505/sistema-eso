import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import ListCosmeticsPage from "./pages/Cosmetics";
import CosmeticDetailsPage from "./pages/CosmeticDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ListCosmeticsPage /> },
      { path: "cosmetic/:id", element: <CosmeticDetailsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
