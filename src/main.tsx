import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import MainPage from "./pages/MainPage.tsx";
import VacationPage from "./pages/VacationPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MeetingPage from "./pages/MeetingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import VacationDetailPage from "./pages/VacationDetailPage.tsx";
import MeetingDetailPage from "./pages/MeetingDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
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
        element: <VacationPage />,
      },
      {
        path: "/meeting",
        element: <MeetingPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/vacationDetail",
        element: <VacationDetailPage />,
      },
      {
        path: "/meetingDetail",
        element: <MeetingDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
