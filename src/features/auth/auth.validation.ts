import { NextFunction, Request, Response } from "express";
import { body, Meta, validationResult } from "express-validator";
import { formatter, compare } from "@/helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const emailUnique = async (value: string, { req }: Meta) => {
  const id = req.body.id;

  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  });

  if (user && user.id !== id) {
    return Promise.reject("Email is already in use");
  }

  return true;
};

export const registerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("Please enter first name")
    .isString()
    .withMessage("Data must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("Please enter last name")
    .isString()
    .withMessage("Data must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Please enter email")
    .isEmail()
    .withMessage("Data must be an email")
    .custom(emailUnique),
  body("password")
    .notEmpty()
    .withMessage("Please enter password")
    .isString()
    .withMessage("Data must be a string"),
  body("gender")
    .notEmpty()
    .withMessage("Please enter gender")
    .isString()
    .withMessage("Data must be a string"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Please enter date of birth")
    .isDate()
    .withMessage("Data must be a date"),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];

const passwordValid = async (value: string, { req }: Meta) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      password: true,
    },
  });

  if (!compare(value, user?.password ?? "")) {
    return Promise.reject("Invalid email or password");
  }

  return true;
};

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Please enter email")
    .isString()
    .withMessage("Data must be a string"),
  body("password")
    .notEmpty()
    .withMessage("Please enter password")
    .isString()
    .withMessage("Data must be a string")
    .custom(passwordValid),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];

export const updateProfileValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("Please enter first name")
    .isString()
    .withMessage("Data must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("Please enter last name")
    .isString()
    .withMessage("Data must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Please enter email")
    .isEmail()
    .withMessage("Data must be an email")
    .custom(emailUnique),
  body("gender")
    .notEmpty()
    .withMessage("Please enter gender")
    .isString()
    .withMessage("Data must be a string"),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Please enter date of birth")
    .isDate()
    .withMessage("Data must be a date"),
  function (req: Request, res: Response, next: NextFunction) {
    var errors = validationResult(req).formatWith(formatter);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    next();
  },
];
