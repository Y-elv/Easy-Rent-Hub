import User from "../models/user";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import emailService from "./emailService";
import dotenv from "dotenv";

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

  async getUserById(id: number) {
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
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
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
      throw new Error("Login failed");
    }
  }

  async verifyEmail(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "your_default_jwt_secret_key"
      ) as JwtPayload & {
        email: string;
      };

      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) {
        throw new Error("User not found");
      }
      user.isVerified = true;
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Email verification failed");
    }
  }
}

export default new UserService();
