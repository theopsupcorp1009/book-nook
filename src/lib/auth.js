import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("bookNook-db");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, 
   trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.0.106:3000",
  ],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    plugins: [
        jwt(), 
    ]
});