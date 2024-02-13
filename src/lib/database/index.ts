import mongoose from "mongoose";
import env from "dotenv";
env.config();

const MONGODB_URI = process.env.MONGODB_URI;
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "bookstore",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  console.log("Connected to database");
  
  return cached.conn;
};
