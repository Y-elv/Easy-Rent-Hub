import { Request, Response } from "express";
import { uploadImages } from "../services/imageService";

export const uploadImagesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res
        .status(400)
        .json({ message: "No files uploaded or invalid file format" });
      return;
    }

    const filePaths = (req.files as Express.Multer.File[]).map(
      (file) => file.path
    );
    const imageUrls = await uploadImages(filePaths);

    res.status(200).json({
      message: "Images uploaded successfully",
      urls: imageUrls,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
