import express from "express";
import mongoose from "mongoose";
import PatientRouter from "./routes/patroutes.js";
import DoctorRouter from "./routes/docroutes.js";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error("Database connection error", error);
  }
}

await connectToDatabase();

const app = express();
app.use(express.json());

app.use("/api/v1", PatientRouter);
app.use("/api/v1/", DoctorRouter);

const port = process.env.PORT || 3039;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
