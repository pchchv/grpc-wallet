import { DataSource } from "typeorm";
import { Transaction } from "./base";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  entities: [Transaction],
  synchronize: true,
  logging: false,
});
