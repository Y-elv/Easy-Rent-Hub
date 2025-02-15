import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    User.hasMany(models.Property, { foreignKey: "hostId" });
    User.hasMany(models.Booking, { foreignKey: "renterId" });
  }
}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
