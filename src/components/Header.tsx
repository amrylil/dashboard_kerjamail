import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ui/ThemeToggle"; // Pastikan path ini benar
import { Menu, Bell, Plus } from "lucide-react";

// --- Komponen Ikon ---
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-gray-400 dark:text-gray-500"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

type HeaderProps = {
  toggleMobileMenu?: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-800 px-4 sm:px-6 py-3 my-3 mx-0 sm:mr-3 sm:ml-0 rounded-none sm:rounded-lg border-b sm:border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        {/* Sisi Kiri: Hamburger Menu (Mobile) & Search (Desktop) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 -ml-2 text-gray-700 dark:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden lg:flex relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search domain, mailbox..."
              className="h-10 w-80 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 pl-11 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Sisi Kanan: Aksi & Profil */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="flex items-center gap-2 rounded-lg bg-[#043a8b] hover:bg-[#0c2556] dark:bg-blue-600 dark:hover:bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Broadcast</span>
          </button>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <button className="relative rounded-full p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-400 border border-white dark:border-slate-800"></span>
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

          {/* Dropdown Profil */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
            >
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?u=ulilamry"
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 group-hover:ring-blue-200 dark:group-hover:ring-blue-500 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Ulil Amry
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  Admin
                </p>
              </div>
              <div
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDownIcon />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Settings
                </a>
                <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
