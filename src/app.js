import express from "express";
import { router as authRouter } from "./auth/auth.controller.js";
import { router as itemRouter } from "./item/item.controller.js";
import { router as userRouter } from "./user/user.controller.js";
import { router as transactionRouter } from "./transaction/transaction.controller.js";
import dotenv from "dotenv";
import cors from "cors";
import { authorizeAdmin } from "./middleware/adminAuthorization.js";

const app = express();
dotenv.config();
// const port = process.env.PORT;

// Middleware untuk menangani request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routing
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/user", authorizeAdmin, userRouter);
app.use("/api/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About Me!");
});

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

export default app;
