import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modal.css";
import BaseUrl from "../utils/config";

const Pending = () => {
 
    return (
        <div>
        <p>Pending</p>
        </div>
    );
};

export default Pending;
