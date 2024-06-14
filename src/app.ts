import dotenv from "dotenv";
import express from "express";
import authRouter from "../src/router/authRoutes";
import userRouter from "./router/userRouter";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
  });
  //router
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  //autentificacion
  //user
};
