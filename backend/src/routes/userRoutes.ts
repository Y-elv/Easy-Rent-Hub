import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  loginUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.post("/login", loginUser);

export default router;
