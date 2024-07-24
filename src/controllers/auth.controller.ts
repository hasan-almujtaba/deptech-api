import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hash } from "../helpers/hash";
import { generate } from "../middlewares/jwt.middleware";
import { RequestWithUser } from "../types/request";

const prisma = new PrismaClient({});

export const register = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      gender: req.body.gender,
      password: hash(req.body.password),
    },
    select: {
      id: false,
      email: true,
    },
  });

  const token = generate(user);

  res.json({
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  const token = generate(user ?? {});

  res.json({
    message: "Success",
    token,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      gender: req.body.gender,
      password: hash(req.body.password),
    },
  });

  res.json({
    message: "Success",
  });
};

export const getUser = async (req: RequestWithUser, res: Response) => {
  const id = req?.user?.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.json({
    message: "Success",
    user,
  });
};
