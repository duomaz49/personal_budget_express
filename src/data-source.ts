import "reflect-metadata";
import { DataSource } from "typeorm";
import { Envelope } from "./entities/Envelope";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Envelope],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [],
});