import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { formatter } from "../helpers/validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const storeTransactionValidation = [
  body("type")
    .notEmpty()
    .withMessage("Please enter type")
    .isString()
    .withMessage("Data must be a string"),
  body("stock")
    .notEmpty()
    .withMessage("Please enter amount")
    .isString()
    .withMessage("Data must be a string"),
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
