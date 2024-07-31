import express from "express";
import { verify } from "@/middlewares";
import {
  destroy,
  index,
  show,
  store,
  update,
  storeProductValidation,
  updateProductValidation,
} from "@/features/product";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage });

router.get("/products", verify, index);
router.get("/products/:id", verify, show);
router.post(
  "/products",
  verify,
  upload.single("image"),
  storeProductValidation,
  store
);
router.put(
  "/products/:id",
  verify,
  upload.single("image"),
  updateProductValidation,
  update
);
router.delete("/products/:id", verify, destroy);

export const productRouter = router;
