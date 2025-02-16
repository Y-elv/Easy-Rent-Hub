import { Model, DataTypes, Sequelize } from "sequelize";

interface BookingAttributes {
  id?: number;
  checkIn: Date;
  checkOut: Date;
  status: string;
  propertyId: number;
  renterId: number;
}

module.exports = (sequelize: Sequelize) => {
  class Booking extends Model<BookingAttributes> implements BookingAttributes {
    public id!: number;
    public checkIn!: Date;
    public checkOut!: Date;
    public status!: string;
    public propertyId!: number;
    public renterId!: number;

    static associate(models: any) {
      // Define associations here
      Booking.belongsTo(models.Property, { foreignKey: "propertyId" });
      Booking.belongsTo(models.User, { foreignKey: "renterId" });
    }
  }

  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      renterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "bookings",
      timestamps: true, // Adds createdAt and updatedAt
    }
  );

  return Booking;
};
