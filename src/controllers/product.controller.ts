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
  console.log(req.file);

  return;

  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      image: req.file as any,
      Category: {
        connect: {
          id: req.body.categoryId,
        },
      },
    },
  });

  res.json({ message: "Success", data: product });
};

export const update = async (req: Request, res: Response) => {
  await prisma.product.update({
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
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the product exists, proceed to delete it
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
