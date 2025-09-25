import React, { useState, useEffect, useRef } from "react";

// --- Icon Components (Inline SVG to avoid dependencies) ---
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
    className="h-4 w-4 text-gray-400"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const PlusIcon = () => (
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
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const MailIcon = () => (
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
    className="h-5 w-5"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const BellIcon = () => (
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
    className="h-5 w-5"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
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

const Header: React.FC = () => {
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
    <header className="bg-white px-6 py-3 shadow-sm my-3 mr-3  rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="search"
              placeholder="Search domain, mailbox, broadcast..."
              className="h-10 w-80 rounded-lg border border-gray-300 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 rounded-lg bg-[#043a8b] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0c2556] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
            <PlusIcon />
            New Broadcast
          </button>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center space-x-1">
            <button className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 transition-colors">
              <MailIcon />
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-blue-600 text-xs font-medium text-white flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>
            <button className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 transition-colors">
              <BellIcon />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-400 border border-white"></span>
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-100 transition-colors group"
            >
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40?u=ulilamry"
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full ring-2 ring-white group-hover:ring-blue-200 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Ulil Amry</p>
                <p className="text-xs text-gray-500 capitalize">Admin</p>
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <div className="my-1 h-px bg-gray-200"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
