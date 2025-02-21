import express from "express";
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  getAvailableProperties,
} from "../controllers/propertyController";
import verifyToken from "../middlewares/verifyToken";
import checkRole from "../middlewares/checkRole";
import multer from "multer";
import { uploadImagesController } from "../controllers/imageController";


const router = express.Router();

// Configure Multer for in-memory storage
const upload = multer({ dest: "uploads/" }); // Configure multer for file uploads

router.post("/upload", upload.array("images"), uploadImagesController);

// ✅ Route to create a property with image upload
router.post(
  '/',
  verifyToken,
  checkRole('Hosts'),
  upload.array('images'),
  createProperty
);

// ✅ Route to get all properties
router.get("/", getAllProperties);

// ✅ Route to get a property by ID
router.get("/:id", getPropertyById);

// ✅ Route to update a property with image upload
router.put(
  "/:id",
  verifyToken,
  checkRole("Hosts"),
  upload.array("images"),
  updateProperty
);

// ✅ Route to delete a property
router.delete("/:id", verifyToken, checkRole("Hosts"), deleteProperty);

// ✅ Route to get available properties
router.get("/check/available", getAvailableProperties);

export default router;
