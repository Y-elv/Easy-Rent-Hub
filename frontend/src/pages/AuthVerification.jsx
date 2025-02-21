import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log("Query Params:", queryParams);
    const outerToken = queryParams.get("token"); // Get the outer token
    const error = queryParams.get("error");

    console.log("Outer Token:", outerToken);
    console.log("Error:", error);

    if (outerToken) {
      try {
        // Decode outer JWT
        const outerBase64Url = outerToken.split(".")[1];
        const outerBase64 = outerBase64Url
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const outerDecodedPayload = JSON.parse(atob(outerBase64));

        // Extract the actual token from the decoded payload
        const innerToken = outerDecodedPayload?.token;

        if (innerToken) {
          localStorage.setItem("token", innerToken);

          // Decode inner JWT to extract role
          const innerBase64Url = innerToken.split(".")[1];
          const innerBase64 = innerBase64Url
            .replace(/-/g, "+")
            .replace(/_/g, "/");
          const decodedPayload = JSON.parse(atob(innerBase64));

          let role = decodedPayload?.role || "";

          toast.success("Google Login successful! Redirecting...", {
            position: "top-right",
          });

          setTimeout(() => {
            if (role === "Renters") {
              navigate("/");
            } else if (role === "Hosts") {
              navigate("/hosts");
            } else {
              navigate("/");
            }
          }, 2000);
        } else {
          throw new Error("Inner token missing in response");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token received", {
          position: "top-right",
        });
      }
    }

    if (error) {
      toast.error("Google Login failed: " + error, {
        position: "top-right",
      });
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Auth Verification</h1>
      <p>Processing authentication...</p>
    </div>
  );
};

export default AuthVerification;
