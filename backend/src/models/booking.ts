import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { v4 as uuidv4 } from "uuid";

class Booking extends Model {
  public id!: string;
  public propertyId!: string;
  public renterId!: string;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public status!: string; // Pending, Confirmed, or Canceled


  static associate(models: any) {
    Booking.belongsTo(models.Property, { foreignKey: "propertyId" });
    Booking.belongsTo(models.User, { foreignKey: "renterId" });
  }
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Generate UUID automatically
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Properties",
        key: "id",
      },
    },
    renterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // Default status is 'pending'
      validate: {
        isIn: [["pending", "confirmed", "canceled"]],
      },
    },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "bookings",
    timestamps: true, // Enables createdAt and updatedAt automatically
  }
);

export default Booking;
