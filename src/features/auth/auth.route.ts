import express from "express";
import { getUser, login, register, updateProfile } from "./auth.controller";
import {
  loginValidation,
  registerValidation,
  updateProfileValidation,
} from "@/features/auth";
import { verify } from "@/middlewares";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.put("/update-profile", updateProfile);
router.get("/user", verify, getUser);

export const authRouter = router;
