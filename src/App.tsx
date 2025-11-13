import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import CosmeticsPage from "./pages/Cosmetics";
import ListCosmeticsPage from "./pages/Cosmetics";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <ListCosmeticsPage /> },
      { path: "cosmetics/:id", element: <CosmeticsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
