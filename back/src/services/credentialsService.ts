import { CredentialModel, UserModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const registerCredentialService = async(username:string,password:string,userid:number):Promise<void>=>{
    const newCredential:Credential = await CredentialModel.create({username,password,})
    const resolve:Credential = await CredentialModel.save(newCredential)

    const user = await UserModel.findOneBy({id:userid})
    if(user){
        user.credential = resolve
        await UserModel.save(user)
    }
}

export const loginCredentialService = async(username:string,password:string):Promise<Credential>=>{
    const credential = await CredentialModel.findOneBy({
        username:username,
        password:password
    })
    
    if(credential){
        return credential
    }else{
        throw new Error("Credenciales Incorrectas")
    }
}