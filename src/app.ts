import express, { Express } from "express";
import dotenv from "dotenv";
import notFound from "./middlewares/404.middleware";
import indexRouter from "./routes";
import transactionRouter from "./features/transaction/transaction.route";
import cors from "cors";
import { authRouter } from "@/features/auth";
import { categoryRouter } from "@/features/category";
import { productRouter } from "@/features/product";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static("public"));

app.use(indexRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(transactionRouter);

app.use(notFound);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
