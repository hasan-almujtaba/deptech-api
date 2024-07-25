import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response) => {
  const transaction = await prisma.transaction.findMany();

  res.json({ message: "Success", data: transaction });
};

export const show = async (req: Request, res: Response) => {
  const product = await prisma.transaction.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json({ message: "Success", data: product });
};

export const store = async (req: Request, res: Response) => {
  const transaction = await prisma.transaction.create({
    data: {
      type: req.body.type,
      stock: +req.body.stock,
    },
  });

  res.json({ message: "Success", data: transaction });
};

export const update = async (req: Request, res: Response) => {
  await prisma.transaction.update({
    where: {
      id: Number(req.body.id),
    },
    data: {
      type: req.body.type,
      stock: Number(req.body.stock),
    },
  });

  res.json({ message: "Success" });
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await prisma.transaction.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
