import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaSave, FaClock } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from sidebar:", token);
    if (token) {
      try {
        const base64Url = token.split(".")[1]; // Extract payload
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = JSON.parse(atob(base64));
        setRole(decodedPayload?.role || "");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const menuItems = [
    { icon: FaHome, text: "Home", path: "/" },
    { icon: FaCity, text: "Explore", path: "/explore" },
    { icon: FaSave, text: "Saved", path: "/saved" },
  ];

  const menuItemsForHost = [
    { icon: FaHome, text: "Home", path: "/hosts" },
    { icon: FaClock, text: "Pending", path: "/Pending" },
    { icon: GiConfirmed, text: "Confirmed", path: "/confirmed" },
  ];

  const selectedMenu = role === "Hosts" ? menuItemsForHost : menuItems;

  return (
    <aside className="sidebar">
      <nav className="space-y-2 p-3 flex-1">
        {selectedMenu.map(({ icon: Icon, text, path }, index) => (
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
