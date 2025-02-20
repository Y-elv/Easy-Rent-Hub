import React, { useState } from "react";
import { FaHome, FaSearch, FaSave } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("Home");

  return (
    <aside className="sidebar">
      <nav className="space-y-2 p-3 flex-1">
        {[
          { icon: FaHome, text: "Home" },
          { icon: FaSearch, text: "Explore" },
          { icon: FaSave, text: "Saved" },
        ].map(({ icon: Icon, text }, index) => (
          <button
            key={index}
            className={`sidebar-button ${active === text ? "active" : ""}`}
            onMouseEnter={() => setActive(text)}
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
