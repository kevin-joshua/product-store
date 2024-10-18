import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Capture the connection result
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

