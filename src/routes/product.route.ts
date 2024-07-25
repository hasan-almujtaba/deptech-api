import express from "express";
import { verify } from "../middlewares/jwt.middleware";
import { updateCategoryValidation } from "../validations/category.validation";
import {
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/product.controller";
import {
  storeProductValidation,
  updateProductValidation,
} from "../validations/product.validation";
import multer from "multer";

const router = express.Router();

const upload = multer({});

router.get("/products", verify, index);
router.get("/products/:id", verify, show);
router.post(
  "/products",
  verify,
  upload.single("image"),
  storeProductValidation,
  store
);
router.post("/products", verify, updateProductValidation, store);
router.put("/products", verify, updateCategoryValidation, update);
router.delete("/products/:id", verify, destroy);

export default router;
