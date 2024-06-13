import bcrypt from "bcrypt";

const SALT_RAOUND: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_RAOUND);
};

//Leer y compara con la base de datos
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
