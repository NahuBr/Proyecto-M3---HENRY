import { Request, Response, Router } from "express";
import { getUser, getUsers, loginUser, registerUser } from "../controllers/usersController";
import { verifyUser } from "../middlewares/verifyUser";

export const usersRouter:Router = Router();

usersRouter.get("/users",getUsers)
usersRouter.get("/users/:id",getUser)
usersRouter.post("/users/register",verifyUser,registerUser)
usersRouter.post("/users/login",loginUser)

