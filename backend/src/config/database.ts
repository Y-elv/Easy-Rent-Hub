import { Sequelize } from "sequelize";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Database name
  process.env.DB_USER as string, // Database user
  process.env.DB_PASSWORD as string, // Database password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres", // Change to 'mysql' if using MySQL
    port: Number(process.env.DB_PORT) || 5432, // Default PostgreSQL port
    logging: false, // Disable logging SQL queries (set to true for debugging)
    define: {
      timestamps: true, // Ensure createdAt & updatedAt fields are auto-generated
    },
  }
);

// Function to test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

export { sequelize, connectDB };
