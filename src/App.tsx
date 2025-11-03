import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import HomePage from "./pages/home";
import CosmeticsPage from "./pages/Cosmetics";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tires/:id", element: <CosmeticsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
