import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}
      console.log(\n MongoDB Connected !! DB HOST:${ConnectionInstance}`);
  } catch (error) {
    console.log("MongoDB Connection Field", eroor)
    process.exit(1);
  }
}

export default ConnectDB