import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const [userInitials, setUserInitials] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.name) {
        const nameParts = userData.name.trim().split(" ");
        let initials = nameParts[0].charAt(0).toUpperCase(); // First letter of first name
        if (nameParts.length > 1) {
          initials += nameParts[1].charAt(0).toUpperCase(); // First letter of last name
        }
        setUserInitials(initials);
      }
    }
  }, []);

  return (
    <div className="navbar">
      <div className="logo">Easy Rental Hub</div>

      <div className="nav-right">
        {userInitials ? (
          <div className="user-section">
            <div className="profile-circle">{userInitials}</div>
            <FaBell className="notification-icon" />
          </div>
        ) : (
          <div className="nav-buttons">
            <button className="nav-button">Register</button>
            <button className="nav-button">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
