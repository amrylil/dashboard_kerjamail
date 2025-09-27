import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { generateCrumbs } from "../utils/generateCrumbs";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const crumbs = generateCrumbs(location.pathname);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden relative font-jost">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobileOpen={isMobileMenuOpen}
        toggle={toggleSidebar}
        toggleMobile={toggleMobileMenu}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} crumbs={crumbs} />

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 rounded-lg border border-gray-200 dark:border-gray-700 mb-3  mr-3 dark:bg-slate-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
