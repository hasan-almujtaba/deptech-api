import express from "express";
import { verify } from "../middlewares/jwt.middleware";
import { index, store, show } from "../controllers/transaction.controller";
import { storeTransactionValidation } from "../validations/transaction.validation";
const router = express.Router();

router.get("/transactions", verify, index);
router.get("/transactions/:id", verify, show);
router.post("/transactions", verify, storeTransactionValidation, store);

export default router;
