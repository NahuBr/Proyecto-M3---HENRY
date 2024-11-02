import { Request, Response } from "express";
import { calcelAppointment, createAppointment, getAppointmentService, getAppointmentsService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";
import { Status } from "../dto/statusDto";

export const getAppointments = async (req:Request,res:Response):Promise<void>=>{
    try{
        const appointments = await getAppointmentsService()
        res.status(200).json(appointments)
    }catch(error){
        res.status(400).send(error)
    }
}
export const getAppointment = async (req:Request,res:Response):Promise<void>=>{
    try{
        const { id } = req.body
        if(!id){
            res.status(400).json("ID no proporcionado")
        }else{
            const appointment:Appointment|null = await getAppointmentService(id)
            res.status(200).json(appointment)
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}

export const postAppointment = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {date,time,userid} = req.body
        if(!date||!time||!userid){
            res.status(400).json("Campos Incompletos.")
        }else{
            const status:Status = "active"
            await createAppointment({date,time,status},userid);
            res.status(200).json(`Turno agendando para el  ${date} correctamente.`)
        }
    }catch(error:any){
        res.status(400).json(error.message)
    }
}
export const putAppointment = async (req:Request,res:Response):Promise<void>=>{
    try{
        const { id } = req.body
        if (!id) {
            res.status(400).json("ID del turno no proporcionado");
        }else{
            const response:string = await calcelAppointment(id)
                res.status(200).json(response)
        }
    }catch(error:any){
        res.status(400).json(error.message);
    }
}