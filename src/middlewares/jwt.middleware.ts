import jwt, { SignOptions } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { RequestWithUser } from "../types/request";

dotenv.config();

export const generate = (user: object): string => {
  const secret = process.env.JWT_SECRET as string;
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(user, secret, options);
};

export const verify = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET as string;

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user as never;

      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
