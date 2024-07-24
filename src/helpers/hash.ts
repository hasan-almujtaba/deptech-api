import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = (plainText: string): string => {
  return bcrypt.hashSync(plainText, saltRounds);
};

export const compare = (plainText: string, hash: string): boolean => {
  return bcrypt.compareSync(plainText, hash);
};
