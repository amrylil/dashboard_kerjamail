import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  BlindsIcon,
  LogOut,
  BoxIcon,
  Cast,
  X,
  Archive,
} from "lucide-react";
import SidebarLink from "./SidebarLink";

type SidebarProps = {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggle?: () => void;
  toggleMobile?: () => void;
};

const Sidebar = ({
  isOpen,
  isMobileOpen,
  toggle,
  toggleMobile,
}: SidebarProps) => {
  return (
    <div className="relative z-20 flex-shrink-0 lg:mb-6 h-full">
      <aside
        className={` 
        h-full flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-800 
        transition-transform duration-300 ease-in-out justify-center 
        fixed inset-y-0 left-0 z-30 w-64 p-4 h 
        lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:p-0 lg:m-3 lg:rounded-lg lg:border lg:border-gray-200 dark:lg:border-gray-700
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${isOpen ? "lg:w-64 lg:px-5 " : "lg:w-20 lg:px-3 items-center"}
      `}
      >
        <button
          onClick={toggleMobile}
          className="absolute top-4 right-4 lg:hidden"
        >
          <X className="h-6 w-6 text-slate-600 dark:text-slate-400" />
        </button>

        <div className="text-2xl font-bold text-sky-600 my-6">
          <div className="flex items-center transition-all duration-200">
            <img
              src="/images/kerjamail.png"
              alt="Logo"
              className="h-10 w-10 flex-shrink-0"
            />
            <div
              className={`ml-2 overflow-hidden transition-all duration-200 ${
                isOpen ? "w-auto opacity-100" : "w-0 opacity-0"
              }`}
            >
              <h1 className="text-xl dark:text-slate-50">KERJAMAIL</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col mt-4 justify-between">
          <nav className="space-y-2">
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
              icon={Users}
              text="Users"
              to="/users"
              isOpen={isOpen}
            />
            <SidebarLink
              icon={Archive}
              text="Reports"
              to="/reports"
              isOpen={isOpen}
            />
          </nav>

          <button className="flex my-4 w-full items-center rounded-lg p-3 text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-gray-50">
            <LogOut className="h-5 w-5" />
            <span
              className={`mx-2 text-sm font-medium transition-all duration-200 ${
                isOpen ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
      <button
        onClick={toggle}
        className={`
      absolute top-11 z-40 h-6 w-6 lg:flex items-center justify-center rounded-full
      text-gray-800 dark:text-gray-200 hidden  
      bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700
       transition-all duration-200
      ${isOpen ? "left-56" : "left-[75px]"}
    `}
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${
            !isOpen && "rotate-180"
          }`}
        />
      </button>
    </div>
  );
};

export default Sidebar;
