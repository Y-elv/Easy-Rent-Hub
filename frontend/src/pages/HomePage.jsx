import React from "react";

import "../styles/HomePage.css";

import Layout from "../components/Layout";
import Search from "../components/Search";

const HomePage = () => {
  return (

      <div>
        <Layout />
        <div className="search">
            <Search />
        </div>
        <div className="background">
            hello
        </div>

      </div>
    
  );
};

export default HomePage;
