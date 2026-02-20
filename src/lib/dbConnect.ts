import mongoose from "mongoose";

export interface connectionObject {
  isConnected?: number;
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
}

export default dbConnect;
