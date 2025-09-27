import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ui/ThemeToggle";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./ui/Breadcrumbs";

type Crumb = {
  name: string;
  href: string;
};

type HeaderProps = {
  toggleMobileMenu?: () => void;
  crumbs: Crumb[];
};

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, crumbs }) => {
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
  }, []);

  return (
    <header className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-800 px-4 sm:px-6 py-1 my-3 mx-0 sm:mr-3 sm:ml-0 rounded-none sm:rounded-lg border-b sm:border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 -ml-2 text-slate-700 dark:text-slate-300"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden lg:block">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden lg:flex relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-64 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 pl-11 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
            />
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <button className="relative rounded-full p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-400 border border-white dark:border-slate-800"></span>
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
            >
              <div className="relative">
                <img
                  src="https://placehold.co/40x40/E9D5FF/7C3AED?text=UA"
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-800 group-hover:ring-purple-200 dark:group-hover:ring-purple-500 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Ulil Amry
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Admin
                </p>
              </div>
              <div
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  My Profile
                </Link>
                <Link
                  to="/setting"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Settings
                </Link>
                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
