import User from "../models/user";

class UserService {
  async createUser(name: string, email: string, role: string) {
    try {
      const user = await User.create({ name, email, role });
      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error retrieving user");
    }
  }

  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error retrieving users");
    }
  }
}

export default new UserService();
