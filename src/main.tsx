import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import MainPage from "./pages/MainPage.tsx";
import ProfilePage from "./pages/profilePage.tsx";
import VacationPage from "./pages/vacationPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/vacation",
        element: <VacationPage/>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
