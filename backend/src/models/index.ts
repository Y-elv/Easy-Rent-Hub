import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { sequelize } from "../config/database";

const basename = path.basename(__filename);

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DB = {
  sequelize,
  Sequelize,
};

// Read all model files dynamically
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.endsWith(".ts")
  )
  .forEach(async (file) => {
    const modelModule = await import(path.join(__dirname, file));
    const model = modelModule.default; // Ensure models use default export
    if (model) {
      db[model.name] = model;
    }
  });

// Establish model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

export default db;
