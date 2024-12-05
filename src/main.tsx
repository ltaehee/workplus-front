import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { lazy, Suspense } from "react";

const MainPage = lazy(() => import("./pages/MainPage.tsx"));
const VacationPage = lazy(() => import("./pages/VacationPage.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.tsx"));
const MeetingPage = lazy(() => import("./pages/MeetingPage.tsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.tsx"));
const VacationDetailPage = lazy(() => import("./pages/VacationDetailPage.tsx"));
const MeetingDetailPage = lazy(() => import("./pages/MeetingDetailPage.tsx"));
const FindPasswordPage = lazy(() => import("./pages/FindPasswordPage.tsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/vacation",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VacationPage />
          </Suspense>
        ),
      },
      {
        path: "/meeting",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MeetingPage />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPage />
          </Suspense>
        ),
      },
      {
        path: "/vacation-detail/:vacationId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VacationDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/meeting-detail/:meetingId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MeetingDetailPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/find-password",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <FindPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
