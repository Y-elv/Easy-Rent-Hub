import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
} from "../controllers/userController";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);

export default router;
