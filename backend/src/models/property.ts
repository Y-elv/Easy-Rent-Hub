import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { v4 as uuidv4 } from "uuid";

class Property extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public price!: number;
  public location!: string;
  public hostId!: string;
  public propertyAvailable!: boolean; 

  static associate(models: any) {
    Property.belongsTo(models.User, { foreignKey: "hostId" });
  }
}

Property.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, 
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
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    propertyAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // By default, property is available
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Property",
    tableName: "properties",
    timestamps: true, 
  }
);

export default Property;
