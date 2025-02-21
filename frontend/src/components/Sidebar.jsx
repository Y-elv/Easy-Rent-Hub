import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaSave } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const menuItems = [
    { icon: FaHome, text: "Home", path: "/" },
    { icon: FaSearch, text: "Explore", path: "/explore" },
    { icon: FaSave, text: "Saved", path: "/saved" },
  ];

  return (
    <aside className="sidebar">
      <nav className="space-y-2 p-3 flex-1">
        {menuItems.map(({ icon: Icon, text, path }, index) => (
          <button
            key={index}
            className={`sidebar-button ${
              location.pathname === path ? "active" : ""
            }`}
            onClick={() => navigate(path)}
          >
            <Icon className="sidebar-icon" />
            <span className="ml-3 hidden lg:block">{text}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
