import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Credential],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./certs/ca.pem').toString(), // Proporciona la ruta correcta
  },
});

// Repositorios para interactuar con las entidades
export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
