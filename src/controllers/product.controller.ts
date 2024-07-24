import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();

  res.json({ message: "Success", data: products });
};

export const show = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json({ message: "Success", data: product });
};

export const store = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      category: {
        connect: {
          id: req.body.categoryId,
        },
      },
    },
  });

  res.json({ message: "Success", data: product });
};
