import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { formatter } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const storeCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter name")
    .isString()
    .withMessage("Data must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Please enter description")
    .isString()
    .withMessage("Data must be a string"),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];

const categoryExist = async (value: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: +value,
    },
  });

  if (!category) {
    return Promise.reject("Category not foundjjjj");
  }

  return true;
};

export const updateCategoryValidation = [
  param("id")
    .notEmpty()
    .withMessage("Please enter id")
    .isNumeric()
    .custom(categoryExist),
  body("name")
    .notEmpty()
    .withMessage("Please enter name")
    .isString()
    .withMessage("Data must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Please enter description")
    .isString()
    .withMessage("Data must be a string"),
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];
