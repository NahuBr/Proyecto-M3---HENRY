import { NextFunction, Request, Response } from "express";
import { CredentialModel } from "../config/data-source";

export const verifyUser = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const {credential} = req.body
        const user = await CredentialModel.findOneBy({
            username:credential.username
        })
        if (user) {
            res.status(400).json("Usuario Ya registrado.")
        }else{
            next()
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}
