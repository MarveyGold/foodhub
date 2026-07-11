import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { ORIGIN } from "$env/static/private";
import { username } from "better-auth/plugins";

await connectDB();
const client = mongoose.connection.getClient();

export const auth = betterAuth({
  baseURL: ORIGIN,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "manager" },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },
});
