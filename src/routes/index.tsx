import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/MainPage";
import DomainsPage from "../pages/DomainPage";
import MailboxesPage from "../pages/MailboxesPage";
import BroadcastsPage from "../pages/BroadcastsPage";
import UsersPage from "../pages/UsersPage";

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
        path: "broadcasts",
        element: <BroadcastsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);
