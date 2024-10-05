import NextAuth from "next-auth"
import LinkedIn from "next-auth/providers/linkedin"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./mongodb"
import { saltAndHashPassword } from "@/utils/password"

interface User {
  _id: string;
  email: string;
  password: string;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedIn,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {

        const pwHash = await saltAndHashPassword(credentials.password as string)

        const user = await client.db("mylampai-company").collection("users").findOne({
          email: credentials.email,
          password: pwHash
        }) as User | null;

        console.log("credentials", credentials)
        console.log("user", user)

        if (!user) {
          return null;
        }

        return user;
      }
    })
  ],
  adapter: MongoDBAdapter(client),
})