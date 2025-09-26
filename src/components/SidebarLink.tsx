import React from "react";
import { NavLink } from "react-router-dom";

type SidebarLinkProps = {
  icon: React.ElementType;
  text: string;
  to: string;
  isOpen: boolean;
  end?: boolean;
};

const SidebarLink = ({
  icon: Icon,
  text,
  to,
  isOpen,
  end,
}: SidebarLinkProps) => {
  // Modified class strings for dark mode
  const activeClasses =
    "bg-blue-100 text-blue-custom dark:bg-slate-700 dark:text-sky-400";
  const inactiveClasses =
    "text-gray-600 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-gray-50";

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300
        ${isActive ? activeClasses : inactiveClasses} 
        ${!isOpen && "justify-center"}
      `}
    >
      <Icon className="h-5 w-5" />
      {isOpen && <span className="mx-2 text-sm font-medium">{text}</span>}
    </NavLink>
  );
};

export default SidebarLink;
