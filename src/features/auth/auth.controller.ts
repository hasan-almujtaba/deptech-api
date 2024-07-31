import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hash } from "@/helpers";
import { generate } from "@/middlewares";
import { RequestWithUser } from "@/types";
import {
  TLoginRequestBody,
  TRegisterRequestBody,
  TUpdateProfileRequestBody,
} from "features/auth";

const prisma = new PrismaClient({});

export const register = async (
  req: Request<object, object, TRegisterRequestBody>,
  res: Response
) => {
  try {
    const { firstName, lastName, dateOfBirth, email, gender, password } =
      req.body;

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        gender: gender,
        password: hash(password),
      },
      select: {
        id: false,
        email: true,
      },
    });

    const token = generate(user);

    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (
  req: Request<object, object, TLoginRequestBody>,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = generate(user ?? {});

    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when logging in user", error });
  }
};

export const updateProfile = async (
  req: Request<object, object, TUpdateProfileRequestBody>,
  res: Response
) => {
  const { dateOfBirth, email, firstName, gender, id, lastName } = req.body;

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        gender: gender,
      },
    });

    return res.json({
      message: "Success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when updating profile", error });
  }
};

export const getUser = async (req: RequestWithUser, res: Response) => {
  try {
    const id = req?.user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    res.json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when getting user profile", error });
  }
};
