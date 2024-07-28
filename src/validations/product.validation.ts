import { NextFunction, Request, Response } from "express";
import { body, check, Meta, param, validationResult } from "express-validator";
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

const categoryExist = async (value: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(value),
    },
  });

  if (!category) {
    return Promise.reject("Category not foundxxx");
  }

  return true;
};

const checkFile = function (value: any, { req }: Meta) {
  if (!req.file) {
    return Promise.reject("Please select an image");
  }

  if (req.file.mimetype.split("/")[0] !== "image") {
    return Promise.reject("Invalid file type");
  }

  return true;
};

export const storeProductValidation = [
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
  body("categoryId")
    .notEmpty()
    .withMessage("Please select category")
    .isNumeric()
    .withMessage("Data must be a string")
    .custom(categoryExist),
  body("stock")
    .notEmpty()
    .withMessage("Please enter stock")
    .isNumeric()
    .withMessage("Data must be a numeric"),
  check("image").custom(checkFile),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];

export const updateProductValidation = [
  param("id")
    .notEmpty()
    .withMessage("Please enter id")
    .isNumeric()
    .custom(productExist),
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
  body("categoryId")
    .notEmpty()
    .withMessage("Please select category")
    .isNumeric()
    .withMessage("Data must be a string"),
  body("stock")
    .notEmpty()
    .withMessage("Please enter stock")
    .isNumeric()
    .withMessage("Data must be a numeric"),
  check("image").optional().custom(checkFile),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];
