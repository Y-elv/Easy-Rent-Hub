import express from "express";
import {
    createProperty,
    deleteProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    getAvailableProperties
} from "../controllers/propertyController";
import verifyToken from "../middlewares/verifyToken";
import checkRole from "../middlewares/checkRole";

const router = express.Router();

router.post("/", verifyToken, checkRole("Hosts"), createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", verifyToken, checkRole("Hosts"), updateProperty);
router.delete("/:id", verifyToken, checkRole("Hosts"), deleteProperty);
router.get("/check/available", getAvailableProperties);

export default router;
