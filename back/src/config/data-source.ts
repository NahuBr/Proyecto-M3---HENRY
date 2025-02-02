import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,  
    synchronize: true,  
    logging: false,  
    entities: [User, Credential],
    subscribers: [],
    migrations: [],
    ssl: { rejectUnauthorized: false } // ✅ Necesario para Railway
});

// Repositorios para interactuar con las entidades
export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
