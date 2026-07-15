import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { ORIGIN } from "$env/static/private";
import { username, admin } from "better-auth/plugins";
import { ac, manager, staff, customer } from "./access-control";

await connectDB();
const client = mongoose.connection.getClient();

export const auth = betterAuth({
  baseURL: ORIGIN,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
    admin({
      defaultRole: "customer",
      adminRoles: ["manager"],
      ac,
      roles: { manager, staff, customer },
    })
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },
});
