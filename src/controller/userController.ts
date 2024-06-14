import { Request, Response } from "express";
import { hashPassword } from "../services/password.services";
import prisma from "../model/user"

export const createUser = async (req: Request, res: Response): Promise<void> => {

  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    if (!email) {
      res.status(401).json({ msg: "El email es obligatorio" })
      return
    }
    if (!password) {
      res.status(401).json({ msg: "Acaso no tenes contraseña soquete" })
      return
    }

    const user = await prisma.create(
      {
        data: {
          email,
          password: hashedPassword
        }
      }
    )
    res.status(201).json(user);
  }
  catch (error: any) {
    if (error?.code == 'P2002' && error?.meta?.target?.includes('email')) {
      res.status(400).json({ msg: 'Se ingreso un Email existente' });
    }
    console.log(error);
    res.status(500).json({ error: "Error al completar" });
  }
};

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json(users);
  }
  catch (error: any) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error, intente mas tarde' })
  }
}


export const getUserById = async (req: Request, res: Response): Promise<void> => {

  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.findUnique(
      {
        where: {
          id: userId
        }
      }
    );

    if (!user) {
      res.status(404).json({ error: 'no se encontro el usuario' })
      return
    }

    res.status(200).json(user);

  }

  catch (error: any) {
    console.log(error);
    res.status(500).json({ error: 'Hubo un error, intente mas tarde' })
  }
}


export const updateUser = async (req: Request, res: Response): Promise<void> => {

  const userId = parseInt(req.params.id);
  const { email, password } = req.body;

  try {

    let dataToUpdate: any = { ...req.body };

    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashPassword;
    }


    if (email) {
      dataToUpdate.email = email;
    }

    const user = await prisma.update(
      {
        where: {
          id: userId
        },
        data: dataToUpdate
      });

    res.status(200).json(user);

  }
  catch (error: any) {
    if (error?.code === 'P2002' && error?.meta?.taget?.includes('email')) {
      res.status(400).json({ error: 'El mail ya existe' });
    } else if (error?.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      console.log(error);
      res.status(500).json({ error: 'Hubo un error, intente mas tarde' })
    }
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body;

  try {
    await prisma.delete({
      where: {
        id: userId
      }
    });

    res.status(200).json({
      msg: `Se a eliminado con exito el usuario ${userId}`
    });
  } catch (error) {

  }
}
