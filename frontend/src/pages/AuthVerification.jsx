import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";


const AuthVerification = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const error = query.get("error");

    if (token) {
      // Save the token in local storage or context
      localStorage.setItem("token", token);
      // Optionally, redirect to a protected route
    }

    if (error) {
      // Handle error
      console.error(error);
    }
  }, [location]);

  return (
    <div>
      <h1>Auth Verification</h1>
      <p>Check console for errors or token.</p>
    </div>
  );
};

export default AuthVerification;
