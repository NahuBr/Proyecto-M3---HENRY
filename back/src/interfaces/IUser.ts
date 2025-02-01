import { ICredential } from "./ICredential";

export interface IUser{
    id:number,
    name:string,
    email:string,
    birthdate:string,
    nDni:number,
    credentialsid:number
}