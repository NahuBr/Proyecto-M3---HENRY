import express from "express";
import { router } from "./routes/indexRouter";
import { usersRouter } from "./routes/usersRouter";
import { appointmentsRouter } from "./routes/appointmentsRouter";
import cors from "cors";
import morgan from "morgan"

export const app = express();

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(router)
app.use(usersRouter)
app.use(appointmentsRouter)