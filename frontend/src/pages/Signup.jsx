import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    console.log("Name:", name, "Role:", role, "password:", password);

    // Handle login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome </h1>
        <p className="login-subtitle">Sign Up to continue</p>

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
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Role"
            className="login-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            SignUp
          </button>
        </form>

        <Link to="/login" className="signup-link">
          have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
