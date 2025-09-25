import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/MainPage";
import DomainsPage from "../pages/DomainPage";
import MailboxesPage from "../pages/MailboxesPage";

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
    ],
  },
]);
