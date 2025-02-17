import User from "../models/user";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import emailService from "./emailService";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();
class UserService {
  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const user = await User.create({ name, email, password, role });
      console.log("user:", user);

      const verificationToken = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY || "your_default_jwt_secret_key",
        { expiresIn: "1h" }
      );

      console.log("verificationToken:", verificationToken);

      // Send verification email
      await emailService.sendVerificationEmail(email, verificationToken);

      return user;
    } catch (error) {
      console.error("Error creating user:", error); // Log error to console
      throw new Error("Error creating user");
    }
  }

  async getUserById(id: string) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw new Error("Error retrieving user");
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw new Error("Error retrieving users");
    }
  }

  async loginUser(email: string, password: string) {
    try {
      console.log("email from login:", email);

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }

      console.log("user.isverified:", user.isverified); // Debug the value of isverified

      // Check if email is verified
      if (!user.isverified) {
        console.log("User's email is not verified"); // Debugging statement
        throw new Error("Your email is not verified. Please verify it first.");
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Create a JWT token
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY || "your_default_jwt_secret_key",
        { expiresIn: "1h" }
      );

      // Return the formatted response
      return { token };
    } catch (error) {
      console.error("Error logging in user:", error);

      // Catch the specific error for unverified email
      if (
        error instanceof Error &&
        error.message === "Your email is not verified. Please verify it first."
      ) {
        throw new Error("Your email is not verified. Please verify it first.");
      }

      // Default error response for other errors
      throw new Error("Login failed");
    }
  }

  async verifyEmailService(token: string) {
    try {
      // Verify the token and extract the user information (e.g., email)
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as JwtPayload;
      const email = decoded.email;

      // Find the user by email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found");
      }

      // Verify the user's email
      user.isverified = true;
      await user.save();

      return { message: "Email verified successfully" };
    } catch (error) {
      console.error("Error in verifyEmailService:", error);
      throw new Error("Verification failed");
    }
  }


}
export default new UserService();
