import express, { Express } from "express";
import dotenv from "dotenv";
import notFound from "./middlewares/404.middleware";
import indexRouter from "./routes";
import authRouter from "./routes/auth.route";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(indexRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);

app.use(notFound);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
