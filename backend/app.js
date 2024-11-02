import express from "express";
import httpstatus from "http-status";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnect } from "./src/dbconnect/dbConfig.js";
import colors from "colors";
import studentRoute from "./src/routes/studentRoute.js";
 import adminRoute from "./src/routes/adminRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

// create an instance of express server
const app = express();
dotenv.config();

const { PORT } = process.env;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);



dbConnect().then(() => {
  console.log("database connection successful".bgGreen);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue);
  });
});


