import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.PORT || 8000;
const isDevelopment = SERVER_PORT === "8000";

interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: string;
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
    port: Number(process.env.DB_PORT) || 5433,
    dialect: "postgres",
  },
  production: {
    database: process.env.DB_PROD_NAME as string,
    username: process.env.DB_PROD_USER as string,
    password: process.env.DB_PROD_PASSWORD as string,
    host: process.env.DB_PROD_HOST as string,
    port: Number(process.env.DB_PROD_PORT) || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

// Log the selected database configuration
console.log(
  "Database Configuration:",
  config[isDevelopment ? "development" : "production"]
);

export default config[isDevelopment ? "development" : "production"];
