import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as userC from "../controller/userController"

const router = express.Router();
const JWT_SECRET = process.env.JWL_SECRET || "default-secret";

//middleware de JWT para ver si
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No autorizado" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error de la autentificacion");
      return res.status(403).json({ error: "no tienes acceso a este recurso" });
    }

    next();
  });
};

router.post("/", authenticateToken, userC.createUser);
router.get("/", authenticateToken, userC.getAllUser);
router.get("/:id", authenticateToken, userC.getUserById);
router.put("/:id", authenticateToken, userC.updateUser);
router.delete("/:id", authenticateToken, userC.deleteUser);

export default router;
