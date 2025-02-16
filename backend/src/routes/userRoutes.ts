import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  loginUser,
} from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", verifyToken, getUserById);
router.get("/", verifyToken, getAllUsers);
router.post("/login", loginUser);

export default router;
