import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css"


const Layout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Layout;
