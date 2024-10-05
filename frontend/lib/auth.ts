import NextAuth from "next-auth"
import LinkedIn from "next-auth/providers/linkedin"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn, Google],
  adapter: MongoDBAdapter(client),
})