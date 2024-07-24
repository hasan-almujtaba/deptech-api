import express from "express";
import { verify } from "../middlewares/jwt.middleware";
// import {
//   destroy,
//   index,
//   show,
//   store,
//   update,
// } from "../controllers/category.controller";
import {
  storeCategoryValidation,
  updateCategoryValidation,
} from "../validations/category.validation";
import { index, show, store } from "../controllers/product.controller";
import { storeProductValidation } from "../validations/product.validation";
const router = express.Router();

router.get("/products", verify, index);
router.get("/products/:id", verify, show);
router.post("/products", verify, storeProductValidation, store);
// router.put("/categories", verify, updateCategoryValidation, update);
// router.delete("/categories/:id", verify, destroy);

export default router;
