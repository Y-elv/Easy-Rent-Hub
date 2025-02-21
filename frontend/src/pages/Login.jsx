import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../utils/config";
import "../styles/login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
   e.preventDefault();
   try {
     const response = await axios.post(`${BaseUrl}/users/login`, {
       email,
       password,
     });

     if (response.status === 200) {
       const token = response.data.result.token;
       localStorage.setItem("token", token);

       // Decode JWT token manually
       const base64Url = token.split(".")[1]; // Get the payload part
       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
       const decodedPayload = JSON.parse(atob(base64));

       let role = ""; 

       if (decodedPayload && decodedPayload.role) {
         role = decodedPayload.role;
       }

       toast.success("Login successful! Redirecting...", {
         position: "top-right",
       });

       setTimeout(() => {
         if (role === "Renters") {
           navigate("/");
         } else if (role === "Hosts") {
           navigate("/hosts");
         } else {
           navigate("/"); // Default fallback
         }
       }, 2000);
     }
   } catch (error) {
     console.error("Login Error:", error);
     toast.error(error.response?.data?.message || "Invalid credentials", {
       position: "top-right",
     });
   }
 };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
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

        <button
          className="google-login-btn"
          onClick={() => (window.location.href = `${BaseUrl}/auth/google`)}
        >
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
