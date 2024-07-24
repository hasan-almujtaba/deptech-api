import express from "express";
import {
  getUser,
  login,
  register,
  updateProfile,
} from "../controllers/auth.controller";
import {
  loginValidation,
  registerValidation,
  updateProfileValidation,
} from "../validations/auth.validation";
import { verify } from "../middlewares/jwt.middleware";
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.put("/update-profile", updateProfileValidation, updateProfile);
router.get("/user", verify, getUser);

export default router;
