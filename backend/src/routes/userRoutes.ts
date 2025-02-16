import express from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  loginUser,
  verifyEmail,
} from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", verifyToken, getUserById);
router.get("/", verifyToken, getAllUsers);
router.post("/login", loginUser);
router.get("/check/verify-email", verifyEmail);


export default router;
