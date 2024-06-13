import { Request, Response } from "express";
import { hashPassword } from "../services/password.services";
import prisma from "../model/user"
import { generateToken } from "../services/auth.services";

export const register = async (req: Request, res: Response):Promise<void> => {


    const {email,password}=req.body;


    try {
        if(!email) throw Error('El email es obligatorio')
        if(!password) throw Error('El Password es obligatorio')
        const hashesPassword = await hashPassword(password)
        console.log(hashPassword);

        const user = await prisma.create(
            {
                data:{
                    email,
                    password: hashesPassword
                }
            }
        );
        const token = generateToken(user);
        res.status(201).json({token})
        
    } catch (error:any) {
        if(!email){
            res.status(400).json({msg: 'El email es obligatorio'})
        }

        if(!password){
            res.status(400).json({msg: 'Es obligatorio poner una contraseña'})
        }

        if(error?.code=='P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({msg: 'Se ingreso un Email existente'})
        }

        console.log(error);       

        res.status(500).json({error:"Error al completar"})
        
    }
}