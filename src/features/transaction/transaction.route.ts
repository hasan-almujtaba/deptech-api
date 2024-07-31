import express from "express";
import { verify } from "@/middlewares";
import { index, store, show } from "@/features/transaction";
import { storeTransactionValidation } from "@/features/transaction";
const router = express.Router();

router.get("/transactions", verify, index);
router.get("/transactions/:id", verify, show);
router.post("/transactions", verify, storeTransactionValidation, store);

export default router;
