import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [__dirname + "/entities/*.ts"],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
    extra: {
      statement_timeout: 10000,
      query_timeout: 10000,
      options: "-c password_encryption=scram-sha-256",
    },
  });

// Repositorios para interactuar con las entidades
export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
