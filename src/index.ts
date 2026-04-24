import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth-routes";

import { errorHandler } from "./middleware/error-handler";


const app = express();
app.use(express.json());


app.use("/auth", authRoutes);
app.use(errorHandler);

console.log("ENV CHECK:", process.env.JWT_SECRET);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});