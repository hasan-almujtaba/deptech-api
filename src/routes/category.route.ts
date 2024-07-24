import express from "express";
import { verify } from "../middlewares/jwt.middleware";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/category.controller";
import {
  storeCategoryValidation,
  updateCategoryValidation,
} from "../validations/category.validation";
const router = express.Router();

router.get("/categories", verify, index);
router.get("/categories/:id", verify, show);
router.post("/categories", verify, storeCategoryValidation, store);
router.put("/categories", verify, updateCategoryValidation, update);
router.delete("/categories/:id", verify, destroy);

export default router;
