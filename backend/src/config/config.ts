import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

interface DBConfig {
  database: string;
  username: string;
  password: string ;
  host: string;
  dialect: Dialect;
  port: number;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const config: Record<string, DBConfig> = {
  development: {
    database: process.env.DB_NAME || "your_local_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
  },
  production: {
    database: process.env.DB_PROD_NAME as string, // Name for production database
    username: process.env.DB_PROD_USER as string, // Username for production
    password: process.env.DB_PROD_PASSWORD as string, // Password for production
    host: process.env.DB_PROD_HOST as string, // Render's internal DB URL
    dialect: "postgres",
    port: Number(process.env.DB_PROD_PORT) || 5432, // Port for production
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

// Log all environment variables and their values
console.log("Environment Variables:", {
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD, // Mask password for security
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PROD_NAME: process.env.DB_PROD_NAME,
  DB_PROD_USER: process.env.DB_PROD_USER,
  DB_PROD_PASSWORD: process.env.DB_PROD_PASSWORD, // Mask password for security
  DB_PROD_HOST: process.env.DB_PROD_HOST,
  DB_PROD_PORT: process.env.DB_PROD_PORT,
});

// Log the selected database configuration
console.log(
  "Database Configuration:",
  config[isProduction ? "production" : "development"]
);

export default config[isProduction ? "production" : "development"];
