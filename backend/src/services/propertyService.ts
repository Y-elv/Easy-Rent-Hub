import Property from "../models/property";

class PropertyService {
  async createProperty(data: any) {
    return await Property.create(data);
  }

  async getAllProperties() {
    return await Property.findAll();
  }

  async getPropertyById(id: string) {
    return await Property.findByPk(id);
  }

  async updateProperty(id: string, data: any) {
    const property = await Property.findByPk(id);
    if (!property) throw new Error("Property not found");
    return await property.update(data);
  }

  async deleteProperty(id: string) {
    const property = await Property.findByPk(id);
    if (!property) throw new Error("Property not found");
    await property.destroy();
    return { message: "Property deleted successfully" };
  }
}

export default new PropertyService();
