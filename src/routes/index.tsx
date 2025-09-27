import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/MainPage";
import DomainsPage from "../pages/DomainPage";
import MailboxesPage from "../pages/MailboxesPage";
import UsersPage from "../pages/UsersPage";
import ReportsPage from "../pages/ReportsPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "domain",
        element: <DomainsPage />,
      },
      {
        path: "mailboxes",
        element: <MailboxesPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "setting",
        element: <SettingsPage />,
      },
    ],
  },
]);
