import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const isProduction = process.env.NODE_ENV === "production";

// Use production or development configuration based on NODE_ENV
const DB_NAME = isProduction ? process.env.DB_PROD_NAME || '' : process.env.DB_NAME || '';
const DB_USER = isProduction ? process.env.DB_PROD_USER || '' : process.env.DB_USER || '';
const DB_PASSWORD = isProduction
  ? process.env.DB_PROD_PASSWORD || ''
  : process.env.DB_PASSWORD || '';
const DB_HOST = isProduction
  ? process.env.DB_PROD_HOST
  : process.env.DB_HOST || "localhost";
const DB_PORT = isProduction
  ? Number(process.env.DB_PROD_PORT)
  : Number(process.env.DB_PORT) || 5432;
const DB_DIALECT = (process.env.DB_DIALECT as Dialect) || "postgres"; // Default to PostgreSQL

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: false, // Disable logging for cleaner output (set to true for debugging)
  define: {
    timestamps: true, // Auto-generates createdAt & updatedAt fields
  },
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {}, // Add SSL options for production only
});

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
