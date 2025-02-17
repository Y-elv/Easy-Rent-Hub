import { Request, Response } from "express";
import UserService from "../services/userService";


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Request Body:", req.body); // Log the body of the request

    const user = await UserService.createUser(name, email, password, role);

    console.log("User created:", user); // Log the created user
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    const err = error as Error; // Explicitly cast to Error
    console.error("Error creating user:", err.message); // Log error to console
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    const err = error as Error; // Explicitly cast to Error
    res.status(404).json({ message: "User not found", error: err.message });
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    const err = error as Error; // Explicitly cast to Error
    res
      .status(500)
      .json({ message: "Error retrieving users", error: err.message });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.status(200).json({ message: "User logged in successfully", result });
  } catch (error) {
    const err = error as Error; // Explicitly cast to Error
    if (err.message === "Your email is not verified. Please verify it first.") {
      res.status(400).json({ message: err.message }); // Specific message for email not verified
    } else {
      res.status(401).json({ message: "Login failed", error: err.message });
    }
  }
};

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.query;
    console.log("Token from verifyEmail controller:", token);
    if (!token) {
      res.status(400).json({ message: "Token is required" });
    }

    // Delegate the verification logic to the service
    const result = await UserService.verifyEmailService(token as string);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};


export { createUser, getUserById, getAllUsers ,loginUser ,verifyEmail};
