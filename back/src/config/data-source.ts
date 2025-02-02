import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,  // Usa la URL completa de conexión de la base de datos
    synchronize: true,              // Sincroniza automáticamente las tablas (en desarrollo)
    logging: false,                 // Desactiva los logs (cámbialo a true para depuración)
    entities: [User, Credential],
    subscribers: [],
    migrations: [],
});

// Repositorios para interactuar con las entidades
export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
