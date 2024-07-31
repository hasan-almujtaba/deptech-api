import express from "express";
import {
  loginValidation,
  registerValidation,
  updateProfileValidation,
  getUser,
  login,
  register,
  updateProfile,
} from "@/features/auth";
import { verify } from "@/middlewares";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.put("/update-profile", updateProfileValidation, updateProfile);
router.get("/user", verify, getUser);

export const authRouter = router;
