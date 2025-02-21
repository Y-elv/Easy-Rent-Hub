import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import "../styles/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Handle login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="separator">OR</div>

        <button className="google-login-btn" onClick={handleLogin}>
          <FaGoogle className="google-icon" />
          Login with Google
        </button>

        <Link to="/sign-up" className="signup-link">
          Don't have an account? Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Login;
