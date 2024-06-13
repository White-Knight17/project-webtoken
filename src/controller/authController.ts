import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../services/password.services";
import prisma from "../model/user"
import { generateToken } from "../services/auth.services";

export const register = async (req: Request, res: Response):Promise<void> => {


    const {email,password}=req.body;


    try {
        if(!email) {
            res.status(400).json({msg: 'El email es obligatorio'})
            return
        }

        if(!password) {
            res.status(400).json({msg: 'Es obligatorio poner una contraseña'})
        }
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

        if(error?.code=='P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({msg: 'Se ingreso un Email existente'})
        }

        console.log(error);       

        res.status(500).json({error:"Error al completar"})
        
    }
}


export const login = async (req: Request, res: Response): Promise<void>=>{
    const{email, password}=req.body;

    try {
        if(!email) {
            res.status(400).json({msg: 'El email es obligatorio'})
            return
        }

        if(!password) {
            res.status(400).json({msg: 'Es obligatorio poner una contraseña'})
        }
 
        const user = await prisma.findUnique({where:{email}});

        if(!user){
            res.status(404).json({error:"Usuario no encontrado"});
            return
        }

        const passwordMatch = await comparePassword(password, user.password);

        if(!password){
            res.status(401).json({error:'usuario y contraseña no coinciden'})
        }


        const token = generateToken(user);
        res.status(200).json({token})

    } catch (error) {
        console.log('error:',error);
        
    }
}