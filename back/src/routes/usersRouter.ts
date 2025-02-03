import { Request, Response, Router } from "express";
import { getUser, getUsers, loginUser, registerUser, SumarPuntosController } from "../controllers/usersController";
import { verifyUser } from "../middlewares/verifyUser";
import multer from "multer";

export const usersRouter:Router = Router();



usersRouter.get("/users",getUsers)
usersRouter.get("/users/:id",getUser)
usersRouter.post("/users/register",verifyUser,registerUser)
usersRouter.post("/users/login",loginUser)
usersRouter.put("/users/modificar",SumarPuntosController)

