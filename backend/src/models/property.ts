import { Model, DataTypes, Sequelize } from "sequelize";

interface PropertyAttributes {
  id?: number;
  title: string;
  description: string;
  price: number;
  location: string;
  hostId: number;
}

module.exports = (sequelize: Sequelize) => {
  class Property
    extends Model<PropertyAttributes>
    implements PropertyAttributes
  {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public location!: string;
    public hostId!: number;

    static associate(models: any) {
      // Define associations here
    }
  }

  Property.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Property",
      tableName: "properties",
      timestamps: true, // Adds createdAt and updatedAt
    }
  );

  return Property;
};
