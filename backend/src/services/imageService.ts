import cloudinary from "../config/cloudinaryConfig";

export const uploadImages = async (filePaths: string[]): Promise<string[]> => {
  try {
    console.log("Uploading images to cloudinary...", filePaths);
    const uploadPromises = filePaths.map((filePath) =>
      cloudinary.uploader.upload(filePath, {
        folder: "Easy_rental_Hub", 
      })
    );

    const results = await Promise.all(uploadPromises);
    return results.map((result) => result.secure_url);
  } catch (error) {
    throw new Error("Failed to upload images");
  }
};
