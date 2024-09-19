import express from "express";
import authRouter from "./routes/auth.js";
import recipeRouter from "./routes/recipes.js";
import { connectDB } from "./database/connect.js";
import dotenv from "dotenv";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { authenticationMiddleware } from "./middleware/authentication.js";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipe", authenticationMiddleware, recipeRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
