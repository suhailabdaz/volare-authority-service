import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
    try {
      const mongoURI = `${process.env.AUTHORITY_MONGO_URI}${process.env.AUTHORITY_MONGODB_NAME}`;
      const conn = await mongoose.connect(
        `${process.env.AUTHORITY_MONGO_URI}${process.env.AUTHORITY_MONGODB_NAME}`
      );    
      console.log(`AuthorityDB-connected: ${conn.connection.host}`);
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  };
  export { connectDB };