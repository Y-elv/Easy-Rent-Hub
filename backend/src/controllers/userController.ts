import { Request, Response } from "express";
import UserService from "../services/userService";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, role } = req.body;
    const user = await UserService.createUser(name, email, role);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    const err = error as Error; // Explicitly cast to Error
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
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

export { createUser, getUserById, getAllUsers };
