import { Status } from "../dto/statusDto";
import { IUser } from "./IUser";

export interface IAppointment{
    id:number,
    date:string,
    time:string,
    userid:number,
    status:Status
}