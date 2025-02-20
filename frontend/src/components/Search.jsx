import React from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/Search.css"; // Import the CSS file

const Search = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search a property"
        className="search-input"
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
