import React from "react";
import { CalendarDays, ListTodo, LayoutGrid, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Calendarpage from "../../pages/Calendarpage";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Calendar", path: "/", icon: <CalendarDays className="w-5 h-5" /> },
    { label: "Tasks", path: "/tasks", icon: <ListTodo className="w-5 h-5" /> },
    { label: "Dashboard", path: "/dashboard", icon: <LayoutGrid className="w-5 h-5" /> },
    { label: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
    <aside className="hidden md:block h-screen w-64 bg-white border-r border-gray-200 p-6 shadow-sm">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-blue-50 ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
