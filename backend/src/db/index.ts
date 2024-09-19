import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../config/constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected ! \n DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

export default connectDB;
