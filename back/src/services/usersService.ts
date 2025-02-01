import { AppDataSource, UserModel } from "../config/data-source"
import { userdata } from "../dto/userdataDto"
import { Credential } from "../entities/Credential"
import { User } from "../entities/User"
import { ICredential } from "../interfaces/ICredential"
import { IUser } from "../interfaces/IUser"
import { registerCredentialService } from "./credentialsService"

export const getUsersService = async():Promise<User[]>=>{
    const users:User[] = await UserModel.find({
        relations:{
            credential:true,
            appointments:true
        }
    });
    return users
}

export const getUserService = async(id:number):Promise<User>=>{
    const user = await UserModel.findOneBy({
        id:id
    })
        if(user){
            return user
        }else{
            throw new Error("Usuario no encontrado")
        }
    }

export const registerUserService = async(userdata:userdata):Promise<User>=>{
    const newUser:User = await UserModel.create(userdata)    
    const result:User = await UserModel.save(newUser)
    return result
}

export const loginUserService = async(credential:Credential):Promise<User>=>{
    const user = await UserModel.findOneBy({
        credential:credential
    })

    if(user){
        return user
    }else{
        throw new Error("Credenciales Incorrectas")
    }
}

export const updateUserProfilePicture = async (userId: number, imagePath: string): Promise<string> => {

  try {
    const user = await UserModel.findOneBy({id:userId});
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    user.profilePicture = imagePath;
    const result = await UserModel.save(user);

    return user.profilePicture
  } catch (error) {
    throw new Error("Error al actualizar la imagen del usuario");
  }
};