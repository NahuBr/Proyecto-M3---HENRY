import { Request, Response, Router } from "express";
import { getAppointment, getAppointments, postAppointment, putAppointment } from "../controllers/appointmentsController";

export const appointmentsRouter:Router = Router();

appointmentsRouter.get("/appointments",getAppointments)
appointmentsRouter.get("/appointments/:id",getAppointment)
appointmentsRouter.post("/appointments/schedule",postAppointment)
appointmentsRouter.put("/appointments/cancel",putAppointment)