import React from "react";
import { useLocation } from "react-router-dom";
const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
