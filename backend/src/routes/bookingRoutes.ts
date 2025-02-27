import { Router } from "express";
import {
  createBooking,
  confirmBooking,
  cancelBooking,
  getPendingBookings,
} from "../controllers/bookingController";
import verifyToken from "../middlewares/verifyToken";
import checkRole from "../middlewares/checkRole";

const router = Router();

router.post("/", verifyToken, checkRole("Renters"), createBooking);
router.get("/pending", verifyToken, checkRole("Hosts"), getPendingBookings);
router.put("/:id/confirm", verifyToken, checkRole("Hosts"), confirmBooking);
router.put("/:id/cancel", verifyToken, checkRole("Hosts"), cancelBooking);

export default router;
