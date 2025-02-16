import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      console.log("role", role);

      const user = await User.create({ name, email, password, role });
      console.log("user created");
      console.log("user", user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
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
      return {token };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw new Error("Login failed");
    }
  }
}

export default new UserService();
