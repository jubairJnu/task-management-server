import mongoose from "mongoose";
import config from "../app/config";

// Connect using Mongoose
async function connectWithMongoose() {
  try {
    await mongoose.connect(config.database_url as string, {
      tls: true,
      ssl: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("Error connecting with Mongoose:", error);
    throw error;
  }
}

export default connectWithMongoose;
