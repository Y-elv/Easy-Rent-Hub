import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modal.css";
import BaseUrl from "../utils/config";
import Layout from "../components/UserLayout";
import "../styles/HomePage.css";
import Search from "../components/Search";
import BookingCard from "../components/BookingCard";

const Pending = () => {
 
    return (
      <div>
        <Layout />
        <div className="search-renters">
          <Search />
        </div>
        <div className="background">
            <BookingCard />
        </div>
      </div>
    );
};

export default Pending;
