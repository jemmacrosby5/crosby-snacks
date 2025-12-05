import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri, { dbName: "snacks" });
    console.log("Connected to MongoDB via Mongoose!");
  } catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1);
  }
}
