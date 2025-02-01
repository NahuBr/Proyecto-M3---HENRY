import express from "express";
import { router } from "./routes/indexRouter";
import { usersRouter } from "./routes/usersRouter";
import { appointmentsRouter } from "./routes/appointmentsRouter";
import cors from "cors";
import morgan from "morgan"
import path from "path";

export const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(morgan("dev"))
const corsOptions = {
    origin: ["https://proyecto-m3-henry.vercel.app", "http://localhost:5173"],  // Permite tanto el origen de Vercel como el de desarrollo local
    methods: "GET,POST,PUT,DELETE",  // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization",  // Encabezados permitidos
  };
  
  app.use(cors(corsOptions));
app.use(express.json())
app.use(router)
app.use(usersRouter)
app.use(appointmentsRouter)