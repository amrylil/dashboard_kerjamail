import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  Locate,
  LocationEditIcon,
  BlindsIcon,
  LogOut,
  BoxIcon,
  Cast,
} from "lucide-react";
import SidebarLink from "./SidebarLink";

type SidebarProps = {
  isOpen: boolean;
  toggle?: () => void;
};

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  return (
    <aside
      className={`flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-800 px-5 transition-all rounded-lg border border-gray-200 dark:border-gray-700 duration-300 py-3 ${
        isOpen ? "w-64 m-3" : "w-20 m-3 mr-6"
      }`}
    >
      <button
        onClick={toggle}
        className={`absolute top-9 z-10 flex h-6 w-6 items-center justify-center rounded-full text-gray-800 dark:text-gray-200 transform transition-all duration-200 ${
          // Modified for dark mode
          isOpen ? "left-56" : "left-20 bg-blue-300 dark:bg-blue-600 shadow-md" // Modified for dark mode
        }`}
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${
            !isOpen && "rotate-180"
          }`}
        />
      </button>

      <div className="text-2xl font-bold text-sky-600">
        <div className="flex transition-all duration-200">
          <img
            src="/images/kerjamail.png"
            alt=""
            className={`${isOpen ? "h-10 w-10" : "h-10 w-10 object-cover"}`}
          />
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col transition-all duration-200 justify-center items-center ml-2 text-slate-900`}
          >
            <h1 className="text-base text-xl dark:text-slate-50">KERJAMAIL</h1>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-2">
          <SidebarLink
            icon={LayoutDashboard}
            text="Dashboard"
            to="/"
            isOpen={isOpen}
            end
          />
          <SidebarLink
            icon={BlindsIcon}
            text="Domains"
            to="/domain"
            isOpen={isOpen}
          />
          <SidebarLink
            icon={BoxIcon}
            text="Mailboxes"
            to="/mailboxes"
            isOpen={isOpen}
          />
          <SidebarLink
            icon={Cast}
            text="Broadcasts"
            to="/broadcasts"
            isOpen={isOpen}
          />
          <SidebarLink icon={Users} text="Users" to="/users" isOpen={isOpen} />
        </nav>
        <div className="-mx-3">
          {/* Modified button below for dark mode */}
          <button className="flex w-full items-center rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-gray-50">
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span
              className={`mx-2 text-sm font-medium transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
