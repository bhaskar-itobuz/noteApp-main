import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = async function dbConnect() {
  const uri = process.env.url;
  try {
    await mongoose.connect(uri);
    console.log("connecting to mongodb");
  } catch (e) {
    console.error(e);
  }
};
