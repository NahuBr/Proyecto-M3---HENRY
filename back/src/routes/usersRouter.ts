import { Request, Response, Router } from "express";
import { getUser, getUsers, loginUser, registerUser, SumarPuntosController } from "../controllers/usersController";
import { verifyUser } from "../middlewares/verifyUser";
import multer from "multer";
import { upload } from "../middlewares/Upload";

export const usersRouter:Router = Router();



usersRouter.post('/upload', upload.single('profilePicture'));
usersRouter.get("/users",getUsers)
usersRouter.get("/users/:id",getUser)
usersRouter.post("/users/register",verifyUser,registerUser)
usersRouter.post("/users/login",loginUser)
usersRouter.post("/puntos/modificar",SumarPuntosController)

