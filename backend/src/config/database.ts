import { Sequelize } from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect as any, // Type assertion to avoid TS errors
    port: config.port,
    logging: false, // Disable logging for cleaner output (set to true for debugging)
    define: {
      timestamps: true, // Auto-generates createdAt & updatedAt fields
    },
    dialectOptions: config.dialectOptions, // Add SSL options for production only
  }
);

// Function to test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw new Error("Database connection error");
  }
};

export { sequelize, connectDB };
