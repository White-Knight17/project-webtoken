import dotenv from "dotenv";
import express from "express";
import authRouter from '../src/router/authRoutes'

dotenv.config();

const app = express();
app.use(express.json());

//router
app.use('/auth',authRouter);
//autentificacion
//user


export default app;