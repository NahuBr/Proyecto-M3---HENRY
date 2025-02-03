import { Request, Response } from "express";
import { getUserService, getUsersService, loginUserService, registerUserService, SumarPuntosService } from "../services/usersService";
import { loginCredentialService, registerCredentialService } from "../services/credentialsService";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";

export const getUsers = async (req:Request,res:Response):Promise<void>=>{
    try{
        const users:User[] = await getUsersService()
        res.status(200).json(users)
    }catch(error){
        res.status(400).send(error)
    }
}
export const getUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {id} = req.body
        if (!id) {
            res.status(400).json("ID del usuario no proporcionado.");
        }else{
            const user:User = await getUserService(id)
            res.status(200).json(user)
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}
export const registerUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {name,email,credential} = req.body
        const points:number = 0
        const admin:boolean = false
        if(!name||!email||!credential.username||!credential.password){
            res.status(400).json("Campos incompletos.")
        }else{
            const newUser:User = await registerUserService({name,email,points,admin})
            await registerCredentialService(credential.username,credential.password,newUser.id)
            
            res.status(200).send(`Usuario ${newUser.name} registrado correctamente.`)
        }
    }catch(error:any){
        res.status(400).send(error.message)
    }
}
export const loginUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {username,password} = req.body;
        
        if(!username||!password){
            res.status(400).json("Campos Incompletos");
        }else{
            const userid:Credential = await loginCredentialService(username,password)        
            if(userid){
                const user:User = await loginUserService(userid)
                res.status(200).json(user)
            }else{
                res.status(400).json("Credenciales Incorrectas")
            }
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}

export const SumarPuntosController = async (req:Request,res:Response):Promise<void>=>{
    try{
        console.log(req.body);
        
        const {points,id} = req.body
        
        if(!points||!id){
            res.status(400).json("Campos incompletos.")
        }else{
            const user = await SumarPuntosService(points,id)
            
            res.status(200).send(`Puntos Sumados.`)
        }
    }catch(error:any){
        res.status(400).send(error.message)
    }
}

