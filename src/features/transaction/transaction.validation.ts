import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { formatter } from "@/helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const productExist = async (value: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +value,
    },
  });

  if (!product) {
    return Promise.reject(`Product with ID ${value} not found`);
  }

  return true;
};

export const storeTransactionValidation = [
  body("type")
    .notEmpty()
    .withMessage("Please enter type")
    .isIn(["STOCK_IN", "STOCK_OUT"])
    .withMessage("Invalid transaction type"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one item"),
  body("items.*.productId")
    .isInt()
    .withMessage("Product ID must be a positive integer")
    .custom(productExist),
  body("items.*.quantity")
    .isInt()
    .withMessage("Quantity must be a positive integer"),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];
