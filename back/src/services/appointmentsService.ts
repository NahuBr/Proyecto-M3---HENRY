import { AppointmentModel, UserModel } from "../config/data-source"
import { appointmentData } from "../dto/appointmetdataDto"
import { Appointment } from "../entities/Appointment"
import { IAppointment } from "../interfaces/IAppointment"


export const getAppointmentsService = async():Promise<Appointment[]>=>{
    const appointments:Appointment[] = await AppointmentModel.find({
        select:{
            user:{
                id:true
            }
        },
        relations:{
            user:true
        }
    })
    return appointments
}

export const getAppointmentService = async(id:number):Promise<Appointment>=>{
    const appointment = await AppointmentModel.findOneBy({
        id:id,
    }
)
    if(appointment){
        return appointment
    }else{
        throw new Error("Turno no encontrado")
    }
}

export const createAppointment = async(appointmentdata:appointmentData,userid:number):Promise<void>=>{    
    const user = await UserModel.findOneBy({id:userid})
    if(user){
        const newAppointment:Appointment = await AppointmentModel.create(appointmentdata)
        newAppointment.user = user
        const result:Appointment = await AppointmentModel.save(newAppointment)
        await UserModel.save(user)
    }else{
        throw new Error("Usuario no encontrado")
    }
}

export const calcelAppointment = async(id:number):Promise<string>=>{
        const appointment = await AppointmentModel.findOneBy({
            id:id
        })
        if (!appointment) {
            throw new Error("Turno no encontrado");
        }else
        if(appointment.status != "cancelled"){
            appointment.status="cancelled"
            await AppointmentModel.save(appointment)
            return "Turno Cancelado"
        }else{
            throw new Error("Turno ya cancelado")
        }
}