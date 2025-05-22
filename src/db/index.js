/*import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`
      console.log(`\n MongoDB Connected !! DB HOST:${ConnectionInstance}`);
  } catch (error) {
    console.log("MongoDB Connection Field", error)
    process.exit(1);
  }
}

export default ConnectDB
*/


import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\nMongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default ConnectDB;