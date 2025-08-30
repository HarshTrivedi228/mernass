import React from "react";
import { NavLink } from "react-router-dom";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../lib/consts/navigation";

const linkClasses =
  "flex items-center gap-3 font-medium px-3 py-2 hover:text-gray-300 hover:no-underline rounded-lg text-lg";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`
        bg-blue-500 w-60 p-3 flex flex-col text-white  rounded-lg
        fixed md:relative h-[97%] z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <button
        className="md:hidden mb-4 p-2 bg-blue-700 rounded"
        onClick={onClose}
      >
        Close
      </button>

      {/* Top / Logo */}
      <div className="flex items-center gap-2 px-1 py-3">
        <h1 className="text-white text-4xl font-bold">Board.</h1>
      </div>

      {/* Links */}
      <div className="flex-1 flex flex-col gap-6 mt-4">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col gap-1 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${linkClasses} ${isActive ? "bg-neutral-700 text-white" : "text-neutral-400"}`
      }
    >
      <span className="text-xl">{item.icon}</span>
      <span>{item.label}</span>
    </NavLink>
  );
}
