import cors from "cors";
// import helmet from 'helmet';
import userRouter from "./routes/userRoutes";
import ResponseHandler from "./middleWares/ResponseHandler";
import Logger from "./helpers/Logger";
import express from "express";
import dotenv from "dotenv";

// Import routes
const log = new Logger();

log.groupEnd();
log.group("Server");

if (process.env.NODE_ENV === "development") {
  log.info(`Running on development mode`);
  require("dotenv").config();
} else if (process.env.NODE_ENV === "production") {
  log.info(`Running on production mode`);
}
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/users", userRouter);
app.use(ResponseHandler.handle);
export default app;
