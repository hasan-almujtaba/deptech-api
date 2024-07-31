import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TTransactionRequestBody } from "@/features/transaction";

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
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving transactions", error });
  }
};

export const show = async (req: Request, res: Response) => {
  const product = await prisma.transaction.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json({ message: "Success", data: product });
};

export const store = async (
  req: Request<object, object, TTransactionRequestBody>,
  res: Response
) => {
  const { type, items } = req.body;

  try {
    const transactionItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    // Start transaction
    await prisma
      .$transaction(async (prisma) => {
        for (const item of items) {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
          });

          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }

          if (type === "STOCK_OUT" && product.stock < item.quantity) {
            return res.json({
              message: "Error",
              error: `Not enough stock for product ID ${item.productId}`,
            });
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
        }

        // Create the transaction record
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

        return transaction;
      })
      .then((transaction) => {
        return res.json({ message: "Success", transaction });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
