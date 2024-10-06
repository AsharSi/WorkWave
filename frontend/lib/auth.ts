import NextAuth from "next-auth"
import LinkedIn from "next-auth/providers/linkedin"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb"
import { saltAndHashPassword } from "@/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedIn,
    Google,
    // Credential provider is not working yet with mongodbadapter
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize (credentials)  {
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

        return user;
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
})