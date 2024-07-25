import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.json({ message: "Success", data: categories });
};

export const show = async (req: Request, res: Response) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(req.params.id ?? 0),
    },
  });

  res.json({ message: "Success", data: category });
};

export const store = async (req: Request, res: Response) => {
  const categories = await prisma.category.create({
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({ message: "Success", data: categories });
};

export const update = async (req: Request, res: Response) => {
  await prisma.category.update({
    where: {
      id: req.body.id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({ message: "Success" });
};

export const destroy = async (req: Request, res: Response) => {
  await prisma.category.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json({ message: "Success" });
};
