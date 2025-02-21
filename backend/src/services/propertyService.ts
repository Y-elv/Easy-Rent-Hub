import Property from "../models/property";
import { uploadImages } from "./imageService";

class PropertyService {
  async createProperty(data: any, images: Express.Multer.File[]): Promise<any> {
    console.log("Creating property with images in service..", data, images);
    const imagePaths = images.map((image: Express.Multer.File) => image.path);
    const imageUrls = await uploadImages(imagePaths);

    const propertyData = {
      ...data,
      imageUrls: imageUrls,
    };
    console.log("Property data with images:", propertyData);

    return await Property.create(propertyData);
  }

  async getAllProperties() {
    return await Property.findAll();
  }

  async getPropertyById(id: string) {
    return await Property.findByPk(id);
  }

  async updateProperty(id: string, data: any, images?: Express.Multer.File[]) {
    const property = await Property.findByPk(id);
    if (!property) throw new Error("Property not found");

    let imageUrls = property.imageUrls || []; // Retain existing images if no new ones are uploaded

    if (images && images.length > 0) {
      console.log("Uploading new images for property update...");
      const imagePaths = images.map((image: Express.Multer.File) => image.path);
      const uploadedUrls = await uploadImages(imagePaths);
      imageUrls = uploadedUrls; // Replace with new images
    }

    const updatedData = { ...data, imageUrls };

    await property.update(updatedData);
    return property;
  }

  async deleteProperty(id: string) {
    const property = await Property.findByPk(id);
    if (!property) throw new Error("Property not found");
    await property.destroy();
    return { message: "Property deleted successfully" };
  }

  async getAvailableProperties() {
    try {
      // Query properties where 'propertyAvailable' is true
      const properties = await Property.findAll({
        where: { propertyAvailable: true },
      });

      return properties;
    } catch (error) {
      throw new Error(`Error retrieving properties: ${error}`);
    }
  }
}

export default new PropertyService();
