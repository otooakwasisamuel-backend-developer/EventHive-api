import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "errorhandler";
import userRouter from "./routes/user.js";
import collegeRouter from "./routes/college.js";
import eventRouter from "./routes/event.js";

// Make database connection
await mongoose.connect(process.env.MONGO_URI);

// Create an app
const app = express();

// Use global middlewares
app.use(cors());
app.use(express.json());

// Use routes
app.use(userRouter);
app.use(collegeRouter);
app.use(eventRouter);

// Use error handler
app.use(errorHandler({ log: false }));

// Listen for incoming request
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});