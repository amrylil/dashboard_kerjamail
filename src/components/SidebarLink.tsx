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
  const activeClasses = "bg-blue-100 text-blue-custom";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-700";

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
