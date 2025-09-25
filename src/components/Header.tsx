import { Search, Plus, Mail, Bell, ChevronDown } from "lucide-react";
import type React from "react";

import { Droplets } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 px-6 py-3 shadow-sm my-3 mr-3 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Cari pendonor, acara, atau permintaan..."
              className="h-10 w-80 rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
            <Droplets className="h-4 w-4" />
            Buat Jadwal Donor
          </button>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center space-x-1">
            <button className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 transition-colors">
              <Mail className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            <button className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-400 border border-white"></span>
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          <button className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-100 transition-colors group">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?u=tmichael"
                alt="User Avatar"
                className="h-9 w-9 rounded-full ring-2 ring-white group-hover:ring-red-200 transition-all"
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">Ulil Amry</p>
              <p className="text-xs text-gray-500 capitalize">Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
