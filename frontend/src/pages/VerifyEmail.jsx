import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/VerifyEmail.css";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      axios
        .get(
          `http://localhost:8000/api/v1/users/check/verify-email?token=${token}`
        )
        .then((response) => {
          setMessage("Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          setMessage("Invalid or expired token. Please try again.");
        });
    } else {
      setMessage(
        "No token provided. Please check your email for the verification link."
      );
    }
  }, [location, navigate]);

  return (
    <div className="verify-email">
      <h1>Verify Email</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
