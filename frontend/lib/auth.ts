import NextAuth from "next-auth"
import LinkedIn from "next-auth/providers/linkedin"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb"
import { saltAndHashPassword } from "@/utils/password"

interface User {
  id: string;
  name: string;
  email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedIn,
    Google,
    // Credentials not working yet
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        let user = null
        const pwHash = await saltAndHashPassword(credentials.password as string)

        user = await client.db("mylampai-company").collection("users").findOne({
          email: credentials.email,
          password: pwHash
        });

        console.log("credentials", credentials)
        console.log("user", user)

        if (!user) {
          console.log("Invalid credentials")
          return null;
        }

        user = {
          id: "1",
          name: "John Doe",
          email: "johndoe@gmail.com",
        };

        console.log("user", user)
        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
})