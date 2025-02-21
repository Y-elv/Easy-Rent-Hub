import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";

const Navbar = () => {
  const [userInitials, setUserInitials] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from navbar:", token);

    if (token) {
      try {
        // Decode JWT token
        const base64Url = token.split(".")[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = JSON.parse(atob(base64));

        if (decodedPayload && decodedPayload.name) {
          const nameParts = decodedPayload.name.trim().split(" ");
          let initials = nameParts[0].charAt(0).toUpperCase();
          if (nameParts.length > 1) {
            initials += nameParts[1].charAt(0).toUpperCase();
          }
          setUserInitials(initials);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Function to logout user
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menuItems = [
    { key: "1", label: <span>My Account</span>, disabled: true },
    { type: "divider" },
    { key: "2", label: <span onClick={logout}>Logout</span> },
  ];

  return (
    <div className="navbar">
      <div className="logo">Easy Rental Hub</div>

      <div className="nav-right">
        {userInitials ? (
          <Dropdown menu={{ items: menuItems }} trigger={["hover"]}>
            <div className="user-section">
              <FaBell className="notification-icon" />
              <div className="profile-circle">{userInitials}</div>
            </div>
          </Dropdown>
        ) : (
          <div className="nav-buttons">
            <button className="nav-button" onClick={() => navigate("/sign-up")}>
              Register
            </button>
            <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
