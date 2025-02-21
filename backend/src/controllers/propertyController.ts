import { Request, Response } from "express";
import PropertyService from "../services/propertyService";

const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request Body:", req.body); // Log request body

    if (!req.files || !Array.isArray(req.files)) {
      console.log("No images uploaded or invalid file format");
      res
        .status(400)
        .json({ message: "No images uploaded or invalid file format" });
      return;
    }

    console.log("Uploaded Files:", req.files); // Log uploaded files

    const property = await PropertyService.createProperty(
      req.body,
      req.files as Express.Multer.File[]
    );

    console.log("Property created:", property); // Log created property
    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    const err = error as Error;
    console.error("Error creating property:", err.message);
    res
      .status(500)
      .json({ message: "Error creating property", error: err.message });
  }
};

const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fetching all properties...");

    const properties = await PropertyService.getAllProperties();

    console.log("Properties retrieved:", properties.length);
    res
      .status(200)
      .json({ message: "Properties retrieved successfully", properties });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching properties:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching properties", error: err.message });
  }
};

const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fetching property ID:", req.params.id);

    const property = await PropertyService.getPropertyById(req.params.id);
    if (!property) {
      console.warn("Property not found");
      res.status(404).json({ message: "Property not found" });
      return;
    }

    console.log("Property retrieved:", property);
    res
      .status(200)
      .json({ message: "Property retrieved successfully", property });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching property:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching property", error: err.message });
  }
};

const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Updating property ID:", req.params.id);

    let images: Express.Multer.File[] = [];
    if (req.files && Array.isArray(req.files)) {
      images = req.files as Express.Multer.File[];
      console.log(
        "New images uploaded:",
        images.map((file) => file.filename)
      );
    }

    const updatedProperty = await PropertyService.updateProperty(
      req.params.id,
      req.body,
      images
    );

    console.log("Property updated:", updatedProperty);
    res
      .status(200)
      .json({ message: "Property updated successfully", updatedProperty });
  } catch (error) {
    const err = error as Error;
    console.error("Error updating property:", err.message);
    res
      .status(500)
      .json({ message: "Error updating property", error: err.message });
  }
};

const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Deleting property ID:", req.params.id);

    await PropertyService.deleteProperty(req.params.id);
    console.log("Property deleted successfully");

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    const err = error as Error;
    console.error("Error deleting property:", err.message);
    res
      .status(500)
      .json({ message: "Error deleting property", error: err.message });
  }
};

const getAvailableProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Fetching available properties...");

    // Fetch available properties using the service
    const properties = await PropertyService.getAvailableProperties();

    console.log("Properties retrieved successfully");

    // If no properties found, return a 404 response
    if (properties.length === 0) {
      res.status(404).json({
        message: "No available properties found",
      });
      return;
    }

    // Return success response with the available properties
    res.status(200).json({
      message: "Properties retrieved successfully",
      properties,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error retrieving properties:", err.message); // Log error to console
    res.status(500).json({
      message: "Error retrieving properties",
      error: err.message,
    });
  }
};

export {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAvailableProperties,
};
