import { Request, Response } from "express";
import { hashPassword } from "../services/password.services";

export const register = async (req: Request, res: Response):Promise<void> => {
    const {email,password}=req.body;


    try {
        const hashesPassword = await hashPassword(password)
        console.log(hashPassword);

        const user = await 
        
    } catch (error) {
        
    }
}