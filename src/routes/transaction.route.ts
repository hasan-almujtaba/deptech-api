import express from "express";
import { verify } from "../middlewares/jwt.middleware";
import {
  index,
  store,
  destroy,
  show,
  update,
} from "../controllers/transaction.controller";
import {
  storeTransactionValidation,
  updateTransactionValidation,
} from "../validations/transaction.validation";
const router = express.Router();

router.get("/transactions", verify, index);
router.get("/transactions/:id", verify, show);
router.post("/transactions", verify, storeTransactionValidation, store);
router.put("/transactions/:id", verify, updateTransactionValidation, update);
router.delete("/transactions/:id", verify, destroy);

export default router;
