import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public role!: string;
  public password!: string;
  public isverified!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    User.hasMany(models.Property, { foreignKey: "hostId" });
    User.hasMany(models.Booking, { foreignKey: "renterId" });
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Generate UUID automatically
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await User.hashPassword(user.password);
      },
    },
  }
);

export default User;
