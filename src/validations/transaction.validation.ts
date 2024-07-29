import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { formatter } from "../helpers/validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const productExist = async (value: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +value,
    },
  });

  if (!product) {
    return Promise.reject("Product not found");
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
    .isInt({ gt: 0 })
    .withMessage("Product ID must be a positive integer")
    .custom(async (productId) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error(`Product with ID ${productId} does not exist`);
      }
      return true;
    }),
  body("items.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  // .isIn(["out", "in"])
  // .withMessage("Data must between out and in"),
  // body("amount")
  //   .notEmpty()
  //   .withMessage("Please enter amount")
  //   .isNumeric()
  //   .withMessage("Data must be a number"),
  // body("productId")
  //   .notEmpty()
  //   .withMessage("Please select product")
  //   .custom(productExist),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];

const categoryExist = async (value: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: value,
    },
  });

  if (!category) {
    return Promise.reject("Category not foundcccc");
  }

  return true;
};

export const updateTransactionValidation = [
  body("type")
    .notEmpty()
    .withMessage("Please enter type")
    .isString()
    .withMessage("Data must be a string"),
  body("stock")
    .notEmpty()
    .withMessage("Please enter amount")
    .isNumeric()
    .withMessage("Data must be a number"),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];
