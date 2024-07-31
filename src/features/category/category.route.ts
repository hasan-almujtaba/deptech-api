import express from "express";
import { verify } from "@/middlewares";
import {
  storeCategoryValidation,
  updateCategoryValidation,
  destroy,
  index,
  show,
  store,
  update,
} from "@/features/category";
const router = express.Router();

router.get("/categories", verify, index);
router.get("/categories/:id", verify, show);
router.post("/categories", verify, storeCategoryValidation, store);
router.put("/categories/:id", verify, updateCategoryValidation, update);
router.delete("/categories/:id", verify, destroy);

export const categoryRouter = router;
