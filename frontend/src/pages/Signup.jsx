import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../utils/config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Email:", email, "Password:", password);
  console.log("Name:", name, "Role:", role, "password:", password);

  try {
    const response = await axios.post(`${BaseUrl}/users`, {
      email,
      password,
      name,
      role,
    });

    // Accept both 200 (OK) and 201 (Created) responses
    if (response.status === 201) {
      toast.success("SignUp successful! Go to Gmail to verify your email.", {
        position: "top-right",
        autoClose: 3000, // Keep toast open for 3 seconds
      });

      console.log("SignUp successful! Go to Gmail to verify your email.");

      // Delay navigation to login page
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("SignUp Error:", error);

    // Show detailed error message if available
    toast.error(
      error.response?.data?.message || "Something went wrong, try again.",
      {
        position: "top-right",
      }
    );
  }
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
