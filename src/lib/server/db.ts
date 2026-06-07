import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { resolve } from "dns";
export async function connectDB() {
  if (mongoose.connection.readyState == 1) return;
  if (mongoose.connection.readyState == 2) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once('connected', resolve)
      mongoose.connection.once('error', reject);
    });
    return;
  }
  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    family: 4,
    serverSelectionTimeoutMS: 20000,
  });
}


