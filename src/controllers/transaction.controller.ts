import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const index = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({ message: "Success", data: transaction });
  } catch (error) {}
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
  const { type, items } = req.body;

  if (type !== "STOCK_IN" && type !== "STOCK_OUT") {
    return res.status(400).json({ error: "Invalid transaction type" });
  }

  try {
    const transactionItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${item.productId} not found` });
      }

      if (type === "STOCK_OUT" && product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Not enough stock for product ID ${item.productId}` });
      }

      if (type === "STOCK_IN") {
        product.stock += item.quantity;
      } else if (type === "STOCK_OUT") {
        product.stock -= item.quantity;
      }

      await prisma.product.update({
        where: { id: product.id },
        data: { stock: product.stock },
      });

      transactionItems.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        type,
        items: {
          create: transactionItems.map((item) => ({
            productId: +item.productId,
            quantity: +item.quantity,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
