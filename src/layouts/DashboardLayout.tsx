import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Header toggleMobileMenu={toggleMobileMenu} />

        <main className="flex-1 overflow-y-auto p-8 bg-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 mb-3  mr-3 dark:bg-slate-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
