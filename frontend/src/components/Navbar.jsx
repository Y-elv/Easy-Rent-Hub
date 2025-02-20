import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Easy Rental Hub</div>
      <div className="nav-buttons">
        <button className="nav-button">Register</button>
        <button className="nav-button">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
